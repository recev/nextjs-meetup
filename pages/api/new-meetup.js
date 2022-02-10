import {MongoClient} from 'mongodb';

async function handler(req, res){

    const data = req.body;
    console.log('handler data', data);

    const url = "mongodb+srv://reciko:tekeve72@firstcluster.un4gx.mongodb.net/meetups?retryWrites=true&w=majority";
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

    client.connect(error =>{
        const meetupCollection = client.db().collection('meetups');
        meetupCollection.insertOne(data);
    });

    res.status(201).json({message: 'inserted'});
}

export default handler