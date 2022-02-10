import {MongoClient} from 'mongodb';

async function handler(req, res){

    const data = req.body;
    console.log('handler data', data);

    let error = '';
    let hasError = true;

    const getMeetupPaths = async () => {
        const url = "mongodb+srv://reciko:tekeve72@firstcluster.un4gx.mongodb.net/meetups?retryWrites=true&w=majority";
        const client = new MongoClient(url);

        try {
            await client.connect();
            const meetupsDb = client.db('meetups');
            const meetupCollection = meetupsDb.collection('meetups');
            await meetupCollection.insertOne(data);
            hasError = false;
        }
        catch(e){
            console.log(e);
        }
         finally {
            await client.close();
        }
    };

    await getMeetupPaths().catch(error => console.log(error));

    if (hasError)
        res.status(201).json({message: 'inserted'});
    
    else
        res.status(400).json({message: error});
}

export default handler