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
    <button @click="sendMessage">Send</button>
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
      const endpoint = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';
      //https://api.openai.com/v1/engines/davinci/completions
      //https://api.openai.com/v1/engines/gpt-3.5-turbo/completions
      //https://api.openai.com/v1/chat/completions


      // Methods
      const sendMessage = async () => {
        // Add user message to the chat
        messages.value.push({ id: Date.now(), content: userMessage.value, isAI: false });

        // Clear the input field
        userMessage.value = '';

        // Call the API to get AI response
        const response = await axios.post(
            endpoint,
            {
              prompt: userMessage.value,
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
          content: response.data.choices[0].text.trim(),
          isAI: true,
        });
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
