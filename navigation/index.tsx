import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';
import HomeScreen from '@/screens/HomeScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import ExamNavigator from './ExamNavigator';
import PrepareNavigator from './PrepareNavigator';
import QuestionBankNavigator from './QuestionBankNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function RootNavigator() {
  const primaryColor = useThemeColor({}, 'primary');
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Exam') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            } else if (route.name === 'QuestionBank') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Prepare') {
              iconName = focused ? 'school' : 'school-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: primaryColor,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'হোম' }} />
        <Tab.Screen name="Exam" component={ExamNavigator} options={{ headerShown: false, title: 'পরীক্ষা' }} />
        <Tab.Screen name="QuestionBank" component={QuestionBankNavigator} options={{ headerShown: false, title: 'প্রশ্ন ব্যাংক' }} />
        <Tab.Screen name="Prepare" component={PrepareNavigator} options={{ headerShown: false, title: 'অনুশীলন' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'প্রোফাইল' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 
 