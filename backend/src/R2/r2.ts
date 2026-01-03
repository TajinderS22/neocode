import { CopyObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

export const client = new S3Client({
  endpoint: "https://4cba97f177c14f79b2f7d3b0c7d5c15c.r2.cloudflarestorage.com",
  region: "auto",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
  },
  forcePathStyle: true,
});

export const listBucketContents = async (bucketName:string) => {
  const response = await client.send(
    new ListObjectsV2Command({
      Bucket: bucketName,
    })
  );

  console.log(response)
  return response.Contents
};


export const copyBaseToUser = async({name , bucketName,userId,neoId,}:{
    name:string,
    bucketName:string,
    userId:string,
    neoId:string
})=>{

    const sourcePrefix="base/"+name;
    const targetPrefix=`users/${userId}/${neoId}`

    let continuationToken:string|undefined;

    do {   

        const listRespnse= await client.send(
            new ListObjectsV2Command({
                Bucket:bucketName,
                Prefix:sourcePrefix,
                ContinuationToken:continuationToken
            })
        );

        if(!listRespnse.Contents) break;
        for(const obj of listRespnse.Contents){
            if(!obj.Key) continue;

            const relativePath=obj.Key.replace(sourcePrefix,"");
            const destinationKey=targetPrefix+relativePath;

            await client.send(
                new CopyObjectCommand({
                    Bucket:bucketName,
                    CopySource:`${bucketName}/${obj.Key}`,
                    Key:destinationKey
                })
            )
        }

        continuationToken = listRespnse.NextContinuationToken;
        
    } while (continuationToken);
}