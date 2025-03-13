import { useEffect } from "react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTE, GET_USER_CHANNELS_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import  ContactList  from "@/components/contact-list";
import CreateChannel from "./components/create-channel";

const ContactsContainer = () => {
const {setDirectMessagesContacts, directMessagesContacts, channels, setChannels} = useAppStore();

  useEffect(() => {
    const getContacts = async () => {

      const response = await apiClient.get(GET_DM_CONTACTS_ROUTE, {
        withCredentials: true,
      });
      if(response.data.contacts){
        setDirectMessagesContacts(response.data.contacts);
      }
    };

    const getChannels = async () => {

      const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, {
        withCredentials: true,
      });
      if(response.data.channels){
        setChannels(response.data.channels);
      }
    }

    getContacts();
    getChannels();
  },[setDirectMessagesContacts, setChannels]);

  

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full ">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Message" />
          <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
          <CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channels}  isChannel={true}/>
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

export default ContactsContainer;

  
const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <svg
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="78" height="32" rx="6" fill="#4A90E2" />
        <path
          d="M20 10H58C60 10 62 12 62 14V22C62 24 60 26 58 26H26L18 30V24H16C14 24 12 22 12 20V14C12 12 14 10 16 10H20Z"
          fill="white"
        />
        <circle cx="28" cy="17" r="2" fill="#4A90E2" />
        <circle cx="38" cy="17" r="2" fill="#4A90E2" />
        <circle cx="48" cy="17" r="2" fill="#4A90E2" />
      </svg>
      <span className="text-4xl font-bold text-[#4A90E2]">InstantConnect</span>
    </div>
  );
};


  
  const Title = ({text}) => {
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm ">
          {text} 
        </h6>
    );
  };