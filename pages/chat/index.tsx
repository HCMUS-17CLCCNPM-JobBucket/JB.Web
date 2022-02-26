// import { chatAPI } from "app/api/modules/chatAPI";
import { chatAPI } from "app/api/modules/chatAPI";
import { ChatCard } from "app/components/atoms/ChatCard";
import ChatLayout from "app/components/layouts/ChatLayout";
import { getAvatar } from "app/utils/getAvatar";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ChatPage() {
  return <ChatLayout />;
}
