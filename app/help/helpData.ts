// HelpData.ts

export interface HelpItem {
    title: string;
    content: string;
  }
  
  export interface FAQItem {
    question: string;
    answer: string;
  }
  
  export const helpData: HelpItem[] = [
    {
      title: "How to make a call",
      content: "To make a call, simply open the app, go to the dialer, and enter the phone number you wish to call. Then, tap the call button to initiate the call."
    },
    {
      title: "How to send a message",
      content: "To send a message, navigate to the messaging section of the app, select the contact you want to message, and type your message in the text field. Finally, tap the send button to send the message."
    },
    // Add more help items as needed
  ];
  
  export const faqData: FAQItem[] = [
    {
      question: "How do I check my balance?",
      answer: "You can check your balance by dialing *123# and pressing the call button. Alternatively, you can open the app and navigate to the balance section."
    },
    {
      question: "What should I do if I have network issues?",
      answer: "If you're experiencing network issues, try restarting your device and checking if you're in an area with good network coverage. If the problem persists, contact our customer support for assistance."
    },
    // Add more FAQ items as needed
  ];
  