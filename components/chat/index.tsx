import { useQueryAction } from "@/hooks/useInvalidateQuery";
import { ChatService, Expenses } from "@/lib/api";
import { parseExpenseQuery } from "@/utils/gemini";
import { getFormattedDate } from "@/utils/utlis";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import ChatLoading from "./chat-loading";

const ChatComponent = () => {
  const expenseService = new Expenses();
  const chats = new ChatService();
  const [chatProcessing, setChatProcessing] = useState<boolean>(false);
  const { invalidateQuery } = useQueryAction();
  const [message, setMessage] = useState("");
  const { data: chatHistory, refetch } = useQuery({
    queryFn: chats.fetchChats,
    queryKey: ["chat-history"],
  });

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setChatProcessing(true);
      const expense = await parseExpenseQuery(message);
      await expenseService.addExpenseToDB(expense);

      const aiText = `Added ₹${expense.amount} for ${expense.sub_category} (${
        expense.category
      }) via ${expense.mode_of_payment}${
        expense.recurring ? ` (Recurring: ${expense.recurring_type})` : ""
      }`;

      await chats.addChatsToDB(message, aiText);
      await invalidateQuery(["expenses"]);
      refetch();
    } catch (err) {
      console.log(err);
    }
    setMessage("");
    setChatProcessing(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-4">
          <View className="flex-1">
            <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
              {/* Map chatHistory into user & AI message pairs */}
              {chatHistory?.flatMap((chat, idx) => [
                <View
                  key={`${idx}-user`}
                  className="mb-2 self-end"
                  style={{
                    backgroundColor: "#00800020",
                    padding: 10,
                    borderRadius: 16,
                    maxWidth: "80%",
                  }}
                >
                  <Text>{chat.chat}</Text>
                  <Text className="text-sm text-gray-500 text-right">
                    {getFormattedDate(chat.created_at)}
                  </Text>
                </View>,
                <View
                  key={`${idx}-ai`}
                  className="mb-2 self-start"
                  style={{
                    backgroundColor: "#e0e0e0",
                    padding: 10,
                    borderRadius: 16,
                    maxWidth: "80%",
                  }}
                >
                  <Text>{chat.ai_response}</Text>
                  <Text className="text-sm text-gray-500 text-right">
                    {getFormattedDate(chat.created_at)}
                  </Text>
                </View>,
              ])}
              {chatProcessing && <ChatLoading />}
            </ScrollView>
          </View>

          <View className="h-fit w-full pb-8 relative flex-row items-center">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Enter your expense (e.g. Paid 500 for groceries)"
              mode="outlined"
              outlineColor="#008000"
              activeOutlineColor="#008000"
              style={{ flex: 1, borderRadius: 32 }}
            />
            <IconButton icon="send" iconColor="#008000" onPress={handleSend} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatComponent;
