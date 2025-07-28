import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store';
import { HOST } from '@/utils/constants';
import { FiVideo, FiPhone } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useRef } from 'react';
const ChatHeader = () => {
  const zpRef = useRef(null);
  const {
    closeChat,
    selectedChatData,
    selectedChatType,
    userInfo,
  } = useAppStore();


  // console.log(userInfo);
  // console.log("break");
  // console.log(selectedChatData);


  // Generate a Token by calling a method.
// @param 1: appID
// @param 2: serverSecret
// @param 3: Room ID
// @param 4: User ID
// @param 5: Username


useEffect(() => {
  if (!userInfo?.id) return;

  const userID = userInfo.id;
  const userName = userInfo.firstName + userID;
  const appID = import.meta.env.VITE_APP_ID;
  const serverSecret = import.meta.env.VITE_SERVER_SECRET;
  let zp = null;
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    null,
    userID,
    userName
  );

  zp = ZegoUIKitPrebuilt.create(TOKEN);
  zp.addPlugins({ ZIM });
  zpRef.current = zp; 
}, [userInfo]);

function inviteVideo() {
    const targetUser = {
      userID: selectedChatData._id, // replace with actual ID
      userName: selectedChatData.firstName + selectedChatData._id,// replace with actual name
    };

    if (!zpRef.current) {
      console.warn("Zego client not initialized yet.");
      return;
    }

    zpRef.current.sendCallInvitation({
      callees: [targetUser],
      callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
      timeout: 60,
    })
    .then((res) => {
      console.warn(res);
    })
    .catch((err) => {
      console.warn(err);
    });
  }
  
  function inviteAudio() {
    const targetUser = {
      userID: selectedChatData._id, // replace with actual ID
      userName: selectedChatData.firstName + selectedChatData._id,// replace with actual name
    };

    if (!zpRef.current) {
      console.warn("Zego client not initialized yet.");
      return;
    }

    zpRef.current.sendCallInvitation({
      callees: [targetUser],
      callType: ZegoUIKitPrebuilt.InvitationTypeVoiceCall,
      timeout: 60,
    })
    .then((res) => {
      console.warn(res);
    })
    .catch((err) => {
      console.warn(err);
    });
  }

  return ( 
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20'>
      <div className='flex gap-5 items-center w-full justify-between'>
        <div className='flex gap-3 items-center justify-center'>
          <div className="w-12 h-12 relative rounded-full">
            {selectedChatType === 'contact' ? (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData?.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black rounded-full"
                  />
                ) : (
                  <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(selectedChatData?.color)}`}>
                    {selectedChatData?.firstName
                      ? selectedChatData.firstName[0]
                      : selectedChatData?.email?.[0]}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className='bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full'>#</div>
            )}
          </div>
          <div>
            {selectedChatType === 'channel' && selectedChatData?.name}
            {selectedChatType === 'contact' &&
              (selectedChatData?.firstName
                ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                : selectedChatData?.email)}
          </div>
        </div>
        <div className='flex items-center justify-center gap-5'>
          <button
            onClick={inviteAudio}
            className='text-neutral-500 hover:text-white transition duration-300'
            title='Audio Call'
          >
            <FiPhone className='text-2xl' />
          </button>
          <button
            onClick={inviteVideo}
            className='text-neutral-500 hover:text-white transition duration-300'
            title='Video Call'
          >
            <FiVideo className='text-2xl' />
          </button>
          <button
            className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
            onClick={closeChat}
          >
            <RiCloseFill className='text-3xl' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;