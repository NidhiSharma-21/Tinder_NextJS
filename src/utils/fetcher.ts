import axios from 'axios';
import { Profile, RandomUserResponse } from '@/types/profile';
import { calculateMatchPercentage } from './match';

export const fetchRandomUsers = async (): Promise<Profile[]> => {
  try {
    
    const response = await axios.get<RandomUserResponse>('https://randomuser.me/api/?results=20&nat=in');
    
    return response.data.results.map((user) => {
      const profile = {
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        age: user.dob.age,
        email: user.email,
        bio: generateIndianBio(user.name.first, user.location.city),
        location: `${user.location.city}, India`,
        picture: user.picture.large, // Using large size (128x128) - highest quality available
        matchPercentage: calculateMatchPercentage(),
        interests: generateInterests(),
        occupation: generateOccupation(),
        education: generateEducation(),
        height: generateHeight(),
        religion: generateReligion(),
        languages: generateLanguages(),
      };
      return profile;
    });
  } catch (error) {
    console.error('Error fetching random users:', error);
    throw new Error('Failed to fetch profiles');
  }
};

const generateIndianBio = (firstName: string, city: string): string => {
  const interests = [
    'traveling across India', 'exploring local cuisine', 'Bollywood movies', 
    'classical music', 'cricket', 'yoga and meditation', 'photography', 
    'street food adventures', 'festival celebrations', 'nature walks'
  ];
  
  const goals = [
    'finding someone to explore India with', 'sharing cultural experiences', 
    'building meaningful connections', 'creating beautiful memories together',
    'learning about different traditions', 'enjoying life\'s simple pleasures'
  ];
  
  const randomInterest = interests[Math.floor(Math.random() * interests.length)];
  const randomGoal = goals[Math.floor(Math.random() * goals.length)];
  
  return `Namaste! I'm ${firstName} from ${city}. I love ${randomInterest} and I'm looking for ${randomGoal}. Let's connect and see where this journey takes us! 🌟`;
};

const generateInterests = (): string[] => {
  const allInterests = [
    'Travel', 'Photography', 'Cooking', 'Music', 'Dancing', 'Reading', 
    'Movies', 'Sports', 'Yoga', 'Art', 'Technology', 'Fashion',
    'Food', 'Nature', 'Fitness', 'Gaming', 'Writing', 'Meditation'
  ];
  
  const numInterests = Math.floor(Math.random() * 4) + 3; // 3-6 interests
  const shuffled = allInterests.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numInterests);
};

const generateOccupation = (): string => {
  const occupations = [
    'Software Engineer', 'Doctor', 'Teacher', 'Business Analyst', 'Designer',
    'Marketing Manager', 'Accountant', 'Lawyer', 'Architect', 'Consultant',
    'Entrepreneur', 'Journalist', 'Artist', 'Chef', 'Engineer', 'Nurse',
    'Sales Manager', 'HR Manager', 'Data Scientist', 'Product Manager'
  ];
  return occupations[Math.floor(Math.random() * occupations.length)];
};

const generateEducation = (): string => {
  const education = [
    'Bachelor of Technology', 'Bachelor of Engineering', 'Bachelor of Commerce',
    'Bachelor of Arts', 'Bachelor of Science', 'Master of Business Administration',
    'Master of Technology', 'Master of Science', 'Bachelor of Medicine',
    'Bachelor of Law', 'Bachelor of Architecture', 'Master of Arts'
  ];
  return education[Math.floor(Math.random() * education.length)];
};

const generateHeight = (): string => {
  const heights = ['5\'2"', '5\'3"', '5\'4"', '5\'5"', '5\'6"', '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"', '6\'0"', '6\'1"'];
  return heights[Math.floor(Math.random() * heights.length)];
};

const generateReligion = (): string => {
  const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Atheist', 'Spiritual'];
  return religions[Math.floor(Math.random() * religions.length)];
};

const generateLanguages = (): string[] => {
  const allLanguages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu'];
  const numLanguages = Math.floor(Math.random() * 3) + 2; // 2-4 languages
  const shuffled = allLanguages.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numLanguages);
};

export const fetchProfiles = async (): Promise<Profile[]> => {
  return fetchRandomUsers();
};
