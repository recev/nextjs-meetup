import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  }
];

const HomePage = (props) => {

  return (
    <MeetupList meetups={props.meetups}></MeetupList>
  )
}

// export async function getStaticProps() {
//   //do fetch, db, fs operations
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//     , revalidate: 3600
//   }
// }

export async function getServerSideProps(context){
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  }
}

export default HomePage;