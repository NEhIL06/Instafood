
import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query  } from "react-native-appwrite";


export const appwrite_config = {
    project_id : process.env.APPWRITE_PROJECT_ID!,
    platform: "com.nehil.krishibazar",
    public_endpoint : process.env.APPWRITE_PUBLIC_ENDPOINT!,
    database_id : process.env.APPWRITE_DATABASE_ID!,
    user_collection_id : process.env.APPWRITE_USER_COLLECTION_ID! ,
}


export const client = new Client();

client
.setEndpoint("https://fra.cloud.appwrite.io/v1")
.setProject("687defff0035523d7f27")
.setPlatform("com.nehil.krishibazar");

export const account = new Account(client);
export const database = new Databases (client);
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