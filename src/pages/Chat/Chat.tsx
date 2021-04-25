import React, { useRef, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonAvatar,
  IonContent,
  IonFooter,
} from "@ionic/react";
import {} from "ionicons/icons";
import InputWithGiphy from "../../components/InputWithGiphy/InputWithGiphy";
import "./Chat.scss";

import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { imgBaseUrl } from "../../redux/api-ref";
import { MsgModel } from "../../redux/MsgType";
import { sendMsg } from "../../redux/authSlice";

type Props = {};

const Chat: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const contentRef = useRef<React.RefObject<HTMLIonContentElement>>(null);
  const chatStream = useSelector((state: RootState) => state.auth.chatStream);
  const chatUser = useSelector(
    (state: RootState) => state.auth.selectedChatUser
  );
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    scrollToBottom(0, true);
  });

  const handleSubmitMessage = (data: any) => {
    console.log("data.message:" + data.message);
    const msg: MsgModel = {
      text: data.message,
      fromUser: currentUser._id,
      fromUserImg: currentUser.profileImages[0].filename!,
      dateTime: new Date(),
      isRead: false,
    };
    dispatch(sendMsg(msg, chatUser?._id!, true));

    setTimeout(() => {
      scrollToBottom();
    });
  };

  const scrollToBottom = (
    duration: number = 500,
    isFirstLoad: boolean = false
  ) => {
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
  };

  const nl2br = (text: string) => {
    if (!text) return text;

    return text.replace(/\n/gi, "<br>");
  };

  return (
    <IonPage className="chat-page">
      <IonHeader className="header-custom">
        <IonToolbar className="toolbar-no-border">
          <IonButtons slot="start">
            <IonBackButton defaultHref="tabs/matches" />
          </IonButtons>
          <IonTitle>
            <IonAvatar>
              <img
                src={imgBaseUrl + chatUser?.profileImages[0].filename}
                alt=""
              />
            </IonAvatar>
            <div className="user-name" style={{ textAlign: "left" }}>
              {chatUser?.displayname}
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* @ts-ignore: TS2739 */}
      <IonContent className="ion-padding" ref={contentRef}>
        <div className="chat-list">
          {chatStream?.myMsgs.map((msg: MsgModel, index) => (
            <div
              className={`chat-item${
                msg.fromUser === currentUser._id ? " chat-item-outgoing" : ""
              }`}
              key={index}
            >
              <div className="chat-item-inner">
                {!(msg.fromUser === currentUser._id) && (
                  <div className="chat-avatar">
                    <img src={imgBaseUrl + msg.fromUserImg} alt="" />
                  </div>
                )}

                <div className="chat-body">
                  <div className={`chat-item-bubble${""}`}>
                    {
                      <div>
                        <div
                          className="chat-text"
                          dangerouslySetInnerHTML={{ __html: nl2br(msg.text) }}
                        />
                        <div className="chat-item-status">
                          {new Date(msg.dateTime).getDate() +
                            "/" +
                            new Date(msg.dateTime).getMonth() +
                            "/" +
                            new Date(msg.dateTime).getFullYear() +
                            "-" +
                            new Date(msg.dateTime).getHours() +
                            ":" +
                            new Date(msg.dateTime).getMinutes()}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar className="toolbar-no-border">
          <InputWithGiphy onChange={handleSubmitMessage} />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

Chat.defaultProps = {};

export default Chat;
