import MeetupDetail from '../../components/meetups/MeetupDetail';
const MeetupDetails = (props) => {
    console.log(props);
    return <section>
        <MeetupDetail
            imageUrl={props.imageUrl}
            title={props.title}
            address={props.address}
            description={props.description}
        ></MeetupDetail>
    </section>
}

export async function getStaticProps(context) {
    console.log('params:', context.params);
    const meetupId = context.params.meetupid;

    const meetups = [
        {
            id: 'm1',
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
            title: "hellow",
            address: "cihee ku min te di t",
            description: "some desc"
        },
        {
            id: 'm2',
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
            title: "hellow 2",
            address: "cihee ku min te di t 2",
            description: "some desc 2"
        }
    ]

    
    const meetup = meetups.find(meetup => meetup.id == meetupId);

    if(meetup)
        return {
            props: meetup
        }
    else
        return {
            props:         {
                id: 'notfound',
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
                title: "hellow notfound",
                address: "cihee ku min te di t notfound",
                description: "some desc notfound"
            }
        }
}

export async function getStaticPaths() {
    return {
        paths:[
            {
                params: {
                    meetupid: 'm1'
                }
            },
            {
                params: {
                    meetupid: 'm2'
                }
            }
        ],
        fallback: true
    }
}

export default MeetupDetails;