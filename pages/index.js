import MeetupList from '../components/meetups/MeetupList';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

const HomePage = (props) => {

  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta name='description' content='a huge list of highly active meetups'></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  )
}

export async function getStaticProps() {

  const getMeetups = async () => {
    const url = "mongodb+srv://reciko:tekeve72@firstcluster.un4gx.mongodb.net/meetups?retryWrites=true&w=majority";
    const client = new MongoClient(url);

    try {
      await client.connect();
      const meetupsDb = client.db('meetups');
      const meetupCollection = meetupsDb.collection('meetups');
      const meetupData = await meetupCollection.find().toArray();

      const meetups = meetupData.map(item => {
        const id = ObjectId(item._id).toString();

        const meetup = {
          key: id,
          id: id,
          title: item.title,
          image: item.image,
          address: item.address,
          description: item.description
        }

        return meetup;
      });

      return meetups;

    } finally {
      await client.close();
    }
  };

  const rmeetups = await getMeetups().catch(error => console.log(error));

  return {
    props: {
      meetups: rmeetups
    }
    , revalidate: 1
  }
}

export default HomePage;