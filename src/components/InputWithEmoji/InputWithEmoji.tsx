import React, { useState, useRef } from "react";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonTextarea,
  IonIcon,
} from "@ionic/react";
import { happyOutline } from "ionicons/icons";
import "./InputWithEmoji.scss";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

type Props = {
  onChange: (d: any) => void;
};

const InputWithEmoji: React.FC<Props> = ({ onChange }) => {
  const [textInput, setTextInput] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const inputRef = useRef<HTMLIonTextareaElement>(null);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setTextInput(textInput + emojiObject.emoji);
  };

  const handleToggleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleSendText = () => {
    if (onChange) {
      onChange({
        type: "text",
        message: textInput,
      });
    }
    setTextInput("");
    if (inputRef && inputRef.current) {
      // @ts-ignore
      inputRef.current.setFocus();
    }
  };

  return (
    <div className="input-with-giphy">
      <div>
        <IonToolbar className="toolbar-no-border">
          <IonButtons slot="start" align-self-bottom className="stick-bottom">
            <IonButton
              fill="solid"
              color="primary"
              shape="round"
              className="button-gif"
              onClick={handleToggleEmoji}
            >
              <IonIcon slot="icon-only" icon={happyOutline} size="small" />
            </IonButton>
          </IonButtons>
          <div className="input-block">
            <IonTextarea
              className="has-auto-grow"
              ref={inputRef}
              autoGrow
              value={textInput}
              onIonChange={(e) => setTextInput(e.detail.value as string)}
              rows={1}
              placeholder="Type a message"
            />
            <IonButtons className="stick-bottom button-submit">
              <IonButton
                type="submit"
                disabled={textInput.length === 0}
                fill="clear"
                size="small"
                color="primary"
                onClick={handleSendText}
              >
                Send
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
        {showEmoji && (
          <Picker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            groupNames={{ smileys_people: "PEOPLE" }}
            disableSearchBar={true}
            pickerStyle={{ width: "100%" }}
            native
          />
        )}
      </div>
    </div>
  );
};

InputWithEmoji.defaultProps = {};

export default InputWithEmoji;
