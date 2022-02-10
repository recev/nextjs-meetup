import { ObjectId, MongoClient } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
const MeetupDetails = (props) => {
    console.log(props);
    return <section>
        <MeetupDetail
            imageUrl={props.image}
            title={props.title}
            address={props.address}
            description={props.description}
        ></MeetupDetail>
    </section>
}

export async function getStaticProps(context) {
    console.log('params:', context.params);
    const meetupId = context.params.meetupid;

    const getMeetupPaths = async () => {
        const url = "mongodb+srv://reciko:tekeve72@firstcluster.un4gx.mongodb.net/meetups?retryWrites=true&w=majority";
        const client = new MongoClient(url);

        try {
            await client.connect();
            const meetupsDb = client.db('meetups');
            const meetupCollection = meetupsDb.collection('meetups');
            const meetupData = await meetupCollection.findOne({ _id: ObjectId(meetupId) });

            console.log('meetupData', meetupData);

            const id = ObjectId(meetupData._id).toString();

            const meetup = {
                key: id,
                id: id,
                title: meetupData.title,
                image: meetupData.image,
                address: meetupData.address,
                description: meetupData.description
            }

            return meetup;

        } finally {
            await client.close();
        }
    };

    const meetup = await getMeetupPaths().catch(error => console.log(error));
    console.log('meetup', meetup);

    return {
        props: meetup
    }
}

export async function getStaticPaths() {

    const getMeetupPaths = async () => {
        const url = "mongodb+srv://reciko:tekeve72@firstcluster.un4gx.mongodb.net/meetups?retryWrites=true&w=majority";
        const client = new MongoClient(url);

        try {
            await client.connect();
            const meetupsDb = client.db('meetups');
            const meetupCollection = meetupsDb.collection('meetups');
            const meetupData = await meetupCollection.find({}, { _id: 1 }).toArray();

            const meetupPaths = meetupData.map(item => {
                const meetupId = ObjectId(item._id).toString();
                return {
                    params: {
                        meetupid: meetupId
                    }
                };
            });

            return meetupPaths;

        } finally {
            await client.close();
        }
    };

    const meetupPaths = await getMeetupPaths().catch(error => console.log(error));
    console.log('rmeetups', meetupPaths);

    return {
        paths: meetupPaths,
        fallback: true
    }
}

export default MeetupDetails;