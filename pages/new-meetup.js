import NewMeetupForm from '../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';

const NewMeetup = () => {

    const router = useRouter();

    const addMeetupHandler = async (meetup) => {
        console.log(meetup);
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetup),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = response.json();
        console.log(responseData);
        router.push('/');
    }
    return (
        <>
            <Head>
                <title>Add your own meetups</title>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
        </>
    )
}

export default NewMeetup;