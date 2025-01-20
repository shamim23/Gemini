import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import "./sidebar.css";
import { Context } from "../../context/Context";

export const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {onSent, prevPrompts, setrecentPrompt} = useContext(Context);
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
        ></img>
        <div className="new-chat">
          <img src={assets.plus_icon}></img>
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>

            {prevPrompts.length > 0 &&
              prevPrompts.map((prompt) => (
                <div className="recent-entry">
                  <img src={assets.message_icon}></img>
                  <p>{prompt}...</p>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};
