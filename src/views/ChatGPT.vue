<template>

  <div class="mt-5">
    <!-- ... -->
    <div v-for="message in messages" :key="message.id">
      <p v-if="message.isAI">AI: {{ message.content }}</p>
      <p v-else>User: {{ message.content }}</p>
    </div>
    <!-- ... -->

    <!-- Input field for user messages -->
    <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
    <button class="btn btn-primary" @click="sendMessage">Send</button>
  </div>
</template>

<script>

  import {ref} from "vue";
  import axios from "axios";
  export default {
    name: "ChatGPT",
    components: {},

    setup(){
      const messages = ref([]);
      const userMessage = ref('');
      const apiKey = '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';
      const endpoint = 'https://api.openai.com/v1/chat/completions';


      // Methods
      const sendMessage = async () => {
        // Add user message to the chat
        messages.value.push({ id: Date.now(), content: userMessage.value, isAI: false });


        // Call the API to get AI response
        const response = await axios.post(
            endpoint,
            {
              model: 'gpt-3.5-turbo',
              //model: 'asst_6RlBH1H73nZ7mWEXKqUY9WCE',
              messages: [{
                role: "user",
                content: userMessage.value
              }],
              //prompt: 'hola que tal',
              temperature: 0.5,
              max_tokens: 150,
            },
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            }
        );

        // Add AI response to the chat
        messages.value.push({
          id: Date.now(),
          //content: response.data.choices[0].text.trim(),
          content: response.data.choices[0].message.content.trim(),
          isAI: true,
        });

        // Clear the input field
        userMessage.value = '';
      };


      return{
        messages,
        userMessage,
        sendMessage
      }

    }


  }

</script>

<style scoped>

</style>
