import React from "react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
  PinterestShareButton,
  PinterestIcon
} from "react-share";

function ShareButton({ link }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      <WhatsappShareButton url={link} title="Digi Card" separator=":: ">
        <WhatsappIcon size={40} round={false} borderRadius={15} />
      </WhatsappShareButton>

      <TelegramShareButton url={link} title="Digi Card">
        <TelegramIcon size={40} round={false} borderRadius={15} />
      </TelegramShareButton>

      <TwitterShareButton url={link} title="Digi Card">
        <TwitterIcon size={40} round={false} borderRadius={15} />
      </TwitterShareButton>

      <LinkedinShareButton url={link} title="Digi Card">
        <LinkedinIcon size={40} round={false} borderRadius={15} />
      </LinkedinShareButton>

      <FacebookShareButton url={link} quote="Digi Card">
        <FacebookIcon size={40} round={false} borderRadius={15} />
      </FacebookShareButton>

      <PinterestShareButton url={link} quote="Digi Card">
        <PinterestIcon size={40} round={false} borderRadius={15} />
      </PinterestShareButton>

      {/* <RedditShareButton url={link} title="Digi Card">
        <RedditIcon size={40} round={false} borderRadius={15} />
      </RedditShareButton> */}

      <EmailShareButton url={link} subject="My Digi Card" body="Check out my Digi Card: ">
        <EmailIcon size={40} round={false} borderRadius={15} />
      </EmailShareButton>
    </div>
  );
}

export default ShareButton;
