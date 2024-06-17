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

  import OpenAI from "openai";



  export default {
    name: "AssistantGPT",
    components: {},

    setup() {
      const messages = ref([]);
      const userMessage = ref('');

      const openai = new OpenAI({
        apiKey: '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',
        dangerouslyAllowBrowser: true
      })

      // Methods
      const sendMessage = async () => {



        const assistant = {id: 'asst_6RlBH1H73nZ7mWEXKqUY9WCE'}

        /*const assistant = await openai.beta.assistants.create({
          name: "Crear indice",
          model: "gpt-4-turbo-preview",
          instructions: "Crea un índice de 4 puntos de la temática que te he dado.",
          tools: [{"type": "code_interpreter"}],
        })*/

        const thread = await openai.beta.threads.create()

        //console.log(thread)
        // Add user message to the chat
        messages.value.push({id: Date.now(), content: userMessage.value, isAI: false});

        // Call the API to get AI response
        const message = await openai.beta.threads.messages.create(
            thread.id,
            {
              role: "user",
              content: userMessage.value
            }
        )

        console.log(message)


        const run = await openai.beta.threads.runs.create(
            thread.id,
            { assistant_id: assistant.id }
        );

        console.log(run)

        let isComplete = false;
        while (!isComplete) {
          const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
          if (runStatus.status === "completed") {
            isComplete = true;
          } else {
            console.log("1")
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }



        console.log("CONSULTA RESUELTA")
        const messagesList = await openai.beta.threads.messages.list(thread.id);

        // Add AI response to the chat
        messages.value.push({
          id: Date.now(),
          //content: response.data.choices[0].text.trim(),
          content: messagesList.body.data[0].content[0].text.value,
          isAI: true,
        });




        // Clear the input field
        userMessage.value = '';
      };


      return {
        messages,
        userMessage,
        sendMessage
      }

    }


  }

</script>

<style scoped>

</style>
