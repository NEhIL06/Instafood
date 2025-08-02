import { ID } from "react-native-appwrite";
import { appwrite_config, database, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[]; // list of customization names
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
    const list = await database.listDocuments(
        appwrite_config.database_id,
        collectionId
    );

    await Promise.all(
        list.documents.map((doc) =>
            database.deleteDocument(appwrite_config.database_id, collectionId, doc.$id)
        )
    );
}

async function clearStorage(): Promise<void> {
    const list = await storage.listFiles(appwrite_config.bucket_id);

    await Promise.all(
        list.files.map((file) =>
            storage.deleteFile(appwrite_config.bucket_id, file.$id)
        )
    );
}

async function uploadImageToStorage(imageUrl: string) {
    const response = await fetch(imageUrl);
    console.log("🔥 Uploading image:", imageUrl); 
    const blob = await response.blob();
    console.log("✅ Uploaded image:", imageUrl);

    const fileObj = {
        name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
        type: "image/jpg",
        size: blob.size,
        uri: imageUrl,
    };
    
    console.log("✅ Creating file object:", fileObj);

    const file = await storage.createFile(
        appwrite_config.bucket_id,
        ID.unique(),
        fileObj
    );
    console.log("✅ Created file:", file);

    return storage.getFileViewURL(appwrite_config.bucket_id, file.$id);
}

async function seed(): Promise<void> {
    // 1. Clear all
    await clearAll(appwrite_config.categories_id);
    await clearAll(appwrite_config.customization_id);
    await clearAll(appwrite_config.menu_id);
    await clearAll(appwrite_config.menuCustomization_id);
    await clearStorage();
    console.log("✅ Cleared all data.");

    // 2. Create Categories
    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
        const doc = await database.createDocument(
            appwrite_config.database_id,
            appwrite_config.categories_id,
            ID.unique(),
            cat
        );
        categoryMap[cat.name] = doc.$id;
    }
    console.log("✅ Created categories.");

    // 3. Create Customizations
    const customizationMap: Record<string, string> = {};
    for (const cus of data.customizations) {
        const doc = await database.createDocument(
            appwrite_config.database_id,
            appwrite_config.customization_id,
            ID.unique(),
            {
                name: cus.name,
                price: cus.price,
                type: cus.type,
            }
        );
        customizationMap[cus.name] = doc.$id;
    }

    console.log("✅ Created customizations.");

    // 4. Create Menu Items
    const menuMap: Record<string, string> = {};
    for (const item of data.menu) {
        console.log("🔥 Creating menu item:", item.name);
        const uploadedImage = await uploadImageToStorage(item.image_url);

        console.log("✅ Uploaded image:", item.name);
        const doc = await database.createDocument(
            appwrite_config.database_id,
            appwrite_config.menu_id,
            ID.unique(),
            {
                name: item.name,
                description: item.description,
                image_url: uploadedImage,
                price: item.price,
                rating: item.rating,
                calories: item.calories,
                protein: item.protein,
                categories: categoryMap[item.category_name],
            }
        );

        console.log("✅ Created menu item:", item.name);

        menuMap[item.name] = doc.$id;

        console.log("✅ Created menu item:", item.name);

        // 5. Create menu_customizations
        for (const cusName of item.customizations) {
            await database.createDocument(
                appwrite_config.database_id,
                appwrite_config.menuCustomization_id,
                ID.unique(),
                {
                    menu: doc.$id,
                    customizations: customizationMap[cusName],
                }
            );
        }
    }

    console.log("✅ Seeding complete.");
}

export default seed;