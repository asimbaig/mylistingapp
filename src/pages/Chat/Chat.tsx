import React, { useState, useRef, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon, IonContent, IonText, IonFooter
} from '@ionic/react';
import {
  shield, checkmarkCircle, heartOutline
} from 'ionicons/icons';
import RandomAvatar from '../../components/RandomAvatar/RandomAvatar';
import InputWithGiphy from '../../components/InputWithGiphy/InputWithGiphy';
import './Chat.scss';
import MESSAGES from './messages.dummy';

type Props = {

}

const Chat: React.FC<Props> = () => {
  const [messages, setMessages] = useState<any[]>(MESSAGES);
  const contentRef = useRef<React.RefObject<HTMLIonContentElement>>(null);

  useEffect(() => {
    scrollToBottom(0, true);
  })

  const handleSubmitMessage = (data: any) => {
    setMessages(prev => [...prev, {
      id: prev.length,
      isSender: true,
      type: data.type, // 'text' or 'image'
      body: data.type.toUpperCase() === 'IMAGE' ? data.imageUrl : data.message,
      timestamp: 'Mar 30, 2021 9:55am'
    }]);

    setTimeout(() => {
      scrollToBottom();
      fakeReply();
    });
  }

  const fakeReply = () => {
    setMessages(prev => [...prev, {
      id: prev.length,
      isSender: false,
      avatar: 'assets/img/avatars/hieu.png',
      type: 'text',
      body: 'Nice. Keep typing dude',
      timestamp: 'Mar 30, 2021 9:57am'
    }]);

    setTimeout(() => {
      scrollToBottom();
    }, 500);
  }

  const scrollToBottom = (duration: number = 500, isFirstLoad: boolean = false) => {
    if (isFirstLoad) {
      setTimeout(() => {
        if (contentRef && contentRef.current) {
          // @ts-ignore
          contentRef.current.scrollToBottom(duration);
        }
      }, 500);
    } else {
      if (contentRef && contentRef.current) {
        // @ts-ignore
        contentRef.current.scrollToBottom(duration);
      }
    }
  }

  const nl2br = (text: string) => {
    if (!text) return text;

    return text.replace(/\n/ig, '<br>');
  }

  return (
    <IonPage className="chat-page">
      <IonHeader className="header-custom">
        <IonToolbar className="toolbar-no-border">
          <IonButtons slot="start">
            <IonBackButton defaultHref="tabs/matches" />
          </IonButtons>
          <IonTitle>
            <RandomAvatar size="sm" />
            <div className="user-name">Tindie 2021</div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton color="secondary">
              <IonIcon slot="icon-only" icon={shield} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      { /* @ts-ignore: TS2739 */ }
      <IonContent className="ion-padding" ref={ contentRef }>
        <div className="ion-padding ion-text-center match-info">
          <IonText color="medium">YOU MATCHED WITH TINDIE ON 03/30/2021</IonText>
        </div>

        <div className="chat-list">
          <div className="chat-timestamp center">
            <strong>Tue, 30 Mar,</strong> 12:38 AM
          </div>

          {
            messages.map((item: any) => (
              <div className={ `chat-item${ item.isSender ? ' chat-item-outgoing' : '' }` } key={ item.id }>
                <div className="chat-item-inner">
                  {
                    !item.isSender &&
                    <div className="chat-avatar">
                      <img src={ item.avatar } alt="" />
                    </div>
                  }

                  <div className="chat-body">
                    <div className={ `chat-item-bubble${ item.type === 'image' ? ' bubble-image' : '' }` }>
                      {
                        item.type !== 'image' &&
                        <div className="chat-text" dangerouslySetInnerHTML={{ __html: nl2br(item.body) }} />
                      }
                      {
                        item.type === 'image' &&
                        <img src={ item.body } alt="" />
                      }
                    </div>

                    {
                      item.isSender &&
                      <div className="chat-item-status">
                        <IonIcon icon={checkmarkCircle} color="secondary" />
                        Sent
                      </div>
                    }
                  </div>

                  {
                    !item.isSender && item.type === 'image' &&
                    <div className="chat-item-reaction">
                      <IonIcon icon={heartOutline} />
                    </div>
                  }
                </div>
              </div>
            ))
          }
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar className="toolbar-no-border">
          <InputWithGiphy
            onChange={ handleSubmitMessage }
          />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

Chat.defaultProps = {

}

export default Chat;
