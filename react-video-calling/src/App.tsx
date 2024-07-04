import { CallControls, CallingState, ParticipantView, SpeakerLayout, StreamCall, StreamTheme, StreamVideo, StreamVideoClient, StreamVideoParticipant, useCall, useCallStateHooks, User } from '@stream-io/video-react-sdk';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWnVja3VzcyIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWnVja3VzcyIsImlhdCI6MTcxOTk4MTQ3MywiZXhwIjoxNzIwNTg2Mjc4fQ.YMfyAs3NJSQLs3Ma4_Ofv590x0E2Fp7iD2j03WBYAkU';
const userId = 'Zuckuss';
const callId = '7DBZtbM3OSDC'; 

// set up the user object
const user: User = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
      <StreamTheme>
        <SpeakerLayout participantsBarPosition='bottom' />
        <CallControls />
      </StreamTheme>
    
  );
};

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

export const MyParticipantList = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        width: '100vw',
      }}
    >
      {participants.map((participant) => (
        <div style={{ width: '100%', aspectRatio: '3 / 2' }}>
          <ParticipantView
            muteAudio
            participant={participant}
            key={participant.sessionId}
          />
        </div>
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: {
  participant?: StreamVideoParticipant;
}) => {
  const { participant } = props;
  return (
    <div 
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '240px',
        height: '135px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      {participant && <ParticipantView muteAudio participant={participant} />}
    </div>
  );
};