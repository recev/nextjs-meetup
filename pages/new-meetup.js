import NewMeetupForm from '../components/meetups/NewMeetupForm';
import {useRouter} from 'next/router';

const NewMeetup = () =>{

    const router = useRouter();

    const addMeetupHandler =  async (meetup) =>{
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
    return <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
}

export default NewMeetup;