
import { Category, CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage  } from "react-native-appwrite";
import * as Sentry from '@sentry/react-native';

export const appwrite_config = {
    project_id : process.env.APPWRITE_PROJECT_ID!,
    platform: "com.nehil.krishibazar",
    public_endpoint : process.env.APPWRITE_PUBLIC_ENDPOINT! as string,
    database_id : "68849ccf000725f375e5",
    user_collection_id : process.env.APPWRITE_USER_COLLECTION_ID! as string,
    categories_id: "688d10c200260b49b71c" as string,
    menu_id: "688d117d0033b3a7f0d7" as string ,
    customization_id: "688d12e7000d68808bbd",
    menuCustomization_id: "688d13ab002894766135",
    bucket_id: "68849cef001df89be612",
}


export const client = new Client();

client
.setEndpoint("https://fra.cloud.appwrite.io/v1")
.setProject("687defff0035523d7f27")
.setPlatform("com.nehil.krishibazar");

export const account = new Account(client);
export const database = new Databases (client);
export const storage = new Storage(client);
const avatar = new Avatars(client);
  

export const createnewUser = async ({email,password,name}:CreateUserParams) => {
    try {
        const newaccount = await account.create(ID.unique(),email,password,name); // creating a new user
        if(!newaccount) throw new Error("Account not created");//checking if the account is created
        await signin({email,password});//then signing in the new user
        const avatarsUrl = await avatar.getInitialsURL(name);
        const newuser = await database.createDocument(
            appwrite_config.database_id,
            appwrite_config.user_collection_id,
            ID.unique(),
            {
                accountId:newaccount.$id,
                name, email, avatar: avatarsUrl,
            }
        )

        return newuser;
    } catch (error:any) { 
        throw new Error(error); 
    }
}

export const signin = async ({email,password}:SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email,password); // we have to use createEmailPasswordSession instead of createSession here 
        if(!session) throw new Error("User not found");
        //await storage.createFile("avatar.png",avatar.getAvatar(user.$id),{read: ["*"],write: ["*"]});
        return session;
    } catch (error:any) {
        throw new Error(error);
    }
}

export const getCurrectuser = async () => {
    try {
        const current_user = await account.get();
        //console.log("🔥 current_user", current_user);
        if(!current_user) throw new Error("User not found");
        const Documents = await database.listDocuments(
            "68849ccf000725f375e5",
            "688a507f00324513035b",
            [Query.equal("accountId", current_user.$id)]
        );
        if(!Documents) throw new Error("User not found");
        return Documents.documents[0];
    } catch (error:any) {
        throw new Error(error);
    }        
}   

export const getMenu = async({category,query}:GetMenuParams)=> {
    try {
        const queries:string[] = [];
        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));
        const menu = await database.listDocuments(
            appwrite_config.database_id,
            appwrite_config.menu_id,
            queries
        ); 
        if(!menu) throw new Error("Menu not found");
        return menu.documents;

    } catch (error:any) {
        console.log("getMenu error", error);    
        Sentry.captureException(error);
        throw new Error(error);
    }
}


export const getCategories = async () => {
    try {
        const categories = await database.listDocuments(
            appwrite_config.database_id,
            appwrite_config.categories_id
        );
        if(!categories) throw new Error("Categories not found");
        return categories.documents as unknown as Category[];
    } catch (error:any) {
        Sentry.captureException(error);
        console.log("getCategories error", error);
        throw new Error(error);
    }
}