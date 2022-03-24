// Create and setup your form here
 
<template>
  <div>
    <header class="vff-header">
      <div class="f-container">
       <!-- Add custom logo here -->
       Feedback Portal
        <!-- <svg class="f-logo" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet" viewBox="0 0 35.606 11.211">
          <path d="M.134.837H3.21V8.01h4.203v2.18H.134V.837z"/>
          <path d="M11.875.59c1.48 0 2.668.448 3.567 1.344s1.35 2.052 1.35 3.47c0 1.48-.445 2.7-1.336 3.632S13.38 10.45 11.9 10.45c-1.678 0-2.954-.54-3.827-1.622-.717-.9-1.08-2.022-1.09-3.397-.01-1.36.39-2.484 1.193-3.374C9.06 1.08 10.292.59 11.875.59zm0 2.283c-.563 0-1.003.222-1.323.662-.338.467-.507 1.124-.507 1.972 0 .865.162 1.524.487 1.978a1.58 1.58 0 0 0 1.369.682c.588 0 1.04-.223 1.355-.668s.474-1.07.474-1.875c0-1.834-.62-2.75-1.855-2.75z"/>
          <path d="M21.565 7.078V5.055h4.217v5.163h-1.986l-.13-.908c-.693.76-1.617 1.142-2.777 1.142-1.383 0-2.488-.437-3.313-1.3s-1.243-2.03-1.252-3.464c-.01-1.462.385-2.65 1.18-3.567.875-1.012 2.11-1.518 3.7-1.518 1.21 0 2.207.303 3 .907s1.264 1.457 1.447 2.556h-2.92c-.207-.787-.73-1.182-1.57-1.182-.553 0-.988.236-1.303.707s-.475 1.153-.475 2.043c0 1.695.652 2.542 1.96 2.542.363 0 .695-.103.998-.306a1.29 1.29 0 0 0 .572-.784h-1.35v.002z"/>
          <path d="M30.556.59c1.48 0 2.668.448 3.568 1.344s1.348 2.052 1.348 3.47c0 1.48-.443 2.7-1.336 3.632S32.06 10.45 30.58 10.45c-1.678 0-2.953-.54-3.826-1.622-.72-.892-1.082-2.022-1.1-3.398-.008-1.357.39-2.48 1.193-3.372C27.74 1.08 28.974.59 30.556.59zm0 2.283c-.563 0-1.002.222-1.322.662-.336.467-.506 1.125-.506 1.972 0 .865.162 1.524.486 1.978s.78.682 1.37.682 1.04-.223 1.355-.668.475-1.07.475-1.875c-.002-1.834-.62-2.75-1.857-2.75z"/>
        </svg> -->
        <div v-show="Vue3GoogleOauth.isInit && Vue3GoogleOauth.isAuthorized" style="float:right">
        <!-- <button @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">sign out</button> -->
          <button style="" @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isInit || !Vue3GoogleOauth.isAuthorized">sign out</button>
      </div>
      </div>
       
    </header>
    <div v-show="!Vue3GoogleOauth.isInit" style="position:fixed;top:50%;left:50%;transform: translate(-50%, -50%);">
      Wait loading
    </div>
    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-on:submit="onSubmit"
      v-bind:questions="questions"
      v-bind:language="language"
      v-bind:standalone="true"
      v-show="Vue3GoogleOauth.isInit && Vue3GoogleOauth.isAuthorized"
    >
    <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <!-- We've overriden the default "complete" slot content -->
     <template v-slot:complete>
        <div class="f-section-wrap">
          <p>
            <span class="fh2">Thank you. 🙏</span>
            <span class="f-section-text">
              Thank you for your contribution for yearly appraisal, Please confirm to submit the review.
            </span>
          </p>
          <p class="f-description">In case you want edit the submission, kindly resubmit... the latest one will be conciderd as the final review.</p>
        </div>  
      </template>

      <!-- We've overriden the default "completeButton" slot content -->
      <template v-slot:completeButton>
        <div class="f-submit" v-if="!submitted">
          <button 
            class="o-btn-action"
            ref="button"
            type="submit"
            href="#"
            v-on:click.prevent="onSendData()"
            aria-label="Press to submit"
          >
            <span>{{ language.submitText }}</span>
          </button>
          <a class="f-enter-desc"
            href="#"
            v-on:click.prevent="onSendData()"
            v-html="language.formatString(language.pressEnter)">
          </a>
        </div>

        <p class="text-success" v-if="submitted">Submitted succesfully.</p>
        <button v-if="submitted"
            class="o-btn-action"
            ref="button"
            type="submit"
            href="#"
            v-on:click.prevent="onSubmiteNew()"
            aria-label="Press to new"
          >
            <span>Submit another review</span>
        </button>
      </template>
    </flow-form>
    <div v-show="Vue3GoogleOauth.isInit && !Vue3GoogleOauth.isAuthorized">
        <!-- <button @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">sign out</button> -->
        <button style="position:fixed;top:50%;left:50%;transform: translate(-50%, -50%);" @click="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized">sign in with your google account</button>
    </div>
  </div>
</template>
<style>
.vff textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid;
    border-radius: 0;
    line-height: 1.48;
    margin: 0 0.6em 0 0;
    outline: 0;
    padding: 0.16em 0.2em;
    font-size: .72em;
    font-weight: 400;
}
.vff .field-multiplepicturechoice ul.f-radios {
    max-width: 750px;
    min-width: auto;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    /* margin: 0 -8px 0 0; */
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: 0 1;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    flex-wrap: nowrap !important;
    -ms-flex-wrap: nowrap !important;
    /* flex-wrap: wrap; */
}
</style>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
  */

  // Import necessary components and classes
  import FlowForm from '../../src/components/FlowForm.vue'
  import QuestionModel, { QuestionType, ChoiceOption, LinkOption ,MatrixRow,MatrixColumn} from '../../src/models/QuestionModel'
  import LanguageModel from '../../src/models/LanguageModel'
  import { inject, toRefs,watchEffect,watch, reactive, ref} from "vue";
// import func from 'vue-editor-bridge';
// import func from 'vue-editor-bridge'
  // If using the npm package, use the following line instead of the ones above.
  // import FlowForm, { QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'
  const desc = "choose the option based on the your experience, if you dont know to rate you can skip and go to next step.."
  const buildMultiChoice = function(id,tagline,title,subtitle,description) {
    return new QuestionModel({
            id: id,
            tagline: tagline,
            title: title,
            subtitle: subtitle,
            description: description,
            helpTextShow: false,
            type: QuestionType.MultiplePictureChoice,
            multiple: false,
            required: false,
            options: [
              new ChoiceOption({
                imageSrc: require('./assets/images/verypoor.png'),
                imageAlt: 'Very Poor',
                label: 'Very poor',
                value: 1
              }),
              new ChoiceOption({
                imageSrc: require('./assets/images/poor.png'),
                imageAlt: 'Needs Attention',
                label: 'Needs attention',
                value: 2
              }),
              new ChoiceOption({
                imageSrc: require('./assets/images/average.png'),
                imageAlt: 'Average',
                label: 'Average',
                value: 3
              }),
              new ChoiceOption({
                imageSrc: require('./assets/images/good.png'),
                imageAlt: '',
                label: 'Meets Expectation',
                value: 4
              }),
              new ChoiceOption({
                imageSrc: require('./assets/images/excellent.png'),
                imageAlt: 'TikTok logo',
                label: 'Excellent',
                value: 5
              }),
            ]
          });
  }

  const getQuestions= function(name) {
        return [
              new QuestionModel({
                id: 'review_by',
                tagline: "Hello,",
                title: 'Welcome to Feedback portal',
                type: QuestionType.SectionBreak,
              }),
              new QuestionModel({
                id: 'review_to',
                tagline: 'Choose peer from the drop down',
                title: 'I am giving this review for ',
                subtitle: "For self review, choose 'Myself' from the drop down",
                type: QuestionType.Dropdown,
                required: true,
                inline: true,
                placeholder: 'Name',
                options: [
                  new ChoiceOption({
                    label: 'Myself',
                    value: 'self@cf.in'
                  }),
                  new ChoiceOption({
                    label: 'Vyshakh',
                    value: 'vysh@cf.in'
                  }),
                  new ChoiceOption({
                    label: 'Venu',
                    value: 'venu@cf.in'
                  })
                ],
              }),

              buildMultiChoice("knowledge",
              "Rate yourself or your peer",
              "Knowledge",
              "rate peer on how knowedgeable are they during your interation",
              desc
              ),
              buildMultiChoice("qualityofwork",
              "Rate yourself or your peer",
              "Quality of Work",
              "How satisfied you about yourself/peer on the quality of work done",
              desc),
              buildMultiChoice("productivity",
              "Rate yourself or your peer",
              "Productivity",
              "How satisfied you about yourself/peer in terms of productivity",
              desc),
              buildMultiChoice("accountability",
              "Rate yourself or your peer",
              "Accountability/Ownership",
              "How satisfied you about yourself/peer in terms of accountability or ownership",
              desc),
              buildMultiChoice("motivation",
              "Rate yourself or your peer",
              "Intrest & Motivation",
              "How did you find the peer or yourself intrest towards/motivation towards work",
              desc),
              buildMultiChoice("availability",
              "Rate yourself or your peer",
              "Availability",
              "How did you find the peer or yourself available during work hours and after for your work dependancies",
              desc),
              buildMultiChoice("teamfit",
              "Rate yourself or your peer",
              "Team Player",
              "How did you find the peer or yourself as a team player, his or her team fit",
              desc),
              
              new QuestionModel({
                id: 'achivements',
                title: 'Achivements',
                type: QuestionType.LongText,
                maxLength: 1000,
                nextStepOnAnswer: false,
                required: true,
                placeholder: 'Mention what yourself/peer achived in the past year...'
              }),
              new QuestionModel({
                id: 'attention',
                title: 'Improvements',
                type: QuestionType.LongText,
                maxLength: 1000,
                nextStepOnAnswer: false,
                required: true,
                placeholder: 'Area of improvment for your peer'
              }),
              new QuestionModel({
                id: 'comments',
                title: 'Comments & Remarks',
                subtitle: "Leave your comments to help your colleage improve. These will be collated as general feedback / appreciation without taking any references",
                type: QuestionType.LongText,
                nextStepOnAnswer: false,
                maxLength: 1000,
                required: false,
                placeholder: "Write any comments you wish to write ...."
              }),
        ]
      }

  export default {
    name: 'example',

    components: {
      FlowForm
    },

    data() {
      return {
        user: '',
        userName: '',
        userObject: {},
        submitted: false,
        completed: false,
        language: new LanguageModel(),
        questions: getQuestions("test")
        // Create question list with QuestionModel instances
        // questions: getQuestions("user"),
      }
    },

    mounted() {
      console.log("called");
      document.addEventListener('keyup', this.onKeyListener)
      if(this.Vue3GoogleOauth.isInit && this.Vue3GoogleOauth.isAuthorized) {
        this.questions[0].tagline= "Hello " + this.Vue3GoogleOauth.instance.currentUser.get().getBasicProfile().getName();
        this.questions[0].subtitle = "You have logged in with " + this.Vue3GoogleOauth.instance.currentUser.get().getBasicProfile().getEmail();
      }
    },

    beforeUnmount() {
      document.removeEventListener('keyup', this.onKeyListener)
    },

    methods: {
      async handleClickSignOut() {
        try {
          await this.$gAuth.signOut();
          console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
          this.user = "";
        } catch (error) {
          console.error(error);
        }
      },
      async handleClickSignIn(){
        try {
          const googleUser = await this.$gAuth.signIn();
          if (!googleUser) {
            return null;
          }
          console.log("googleUser", googleUser);
          this.user = googleUser.getBasicProfile().getEmail();
          console.log("getId", this.user);
          console.log("getBasicProfile", googleUser.getBasicProfile());
          console.log("getAuthResponse", googleUser.getAuthResponse());
          console.log("getAuthResponse", this.$gAuth.instance.currentUser.get().getAuthResponse());
        } catch (error) {
          //on fail do something
          console.error(error);
          return null;
        }
      },
      onKeyListener($event) {
        // We've overriden the default "complete" slot so
        // we need to implement the "keyup" listener manually.
        if ($event.key === 'Enter' && this.completed && !this.submitted) {
          this.onSendData()
        }
      },

      /* eslint-disable-next-line no-unused-vars */
      onComplete(completed, questionList) {
        // This method is called whenever the "completed" status is changed.
        this.completed = completed
      },
      onSubmiteNew() {
        // this.$refs.flowform.reset();
        this.$refs.flowform.submitted = false;
        this.$refs.flowform.reset();
        this.$refs.flowform.goToQuestion(1);
      },
      /* eslint-disable-next-line no-unused-vars */
      onSubmit(questionList) {
        // This method will only be called if you don't override the
        // completeButton slot.
        this.onSendData()
      },
      
      onSendData() {
        // Set `submitted` to true so the form knows not to allow back/forward
        // navigation anymore.
        this.$refs.flowform.submitted = true

        this.submitted = true

        /* eslint-disable-next-line no-unused-vars */
        const data = this.getData()
        console.log(data);
        /*
          You can use Fetch API to send the data to your server, eg.:
        */
       data.review_by = this.Vue3GoogleOauth.instance.currentUser.get().getBasicProfile().getEmail();

        fetch('https://x8ki-letl-twmt.n7.xano.io/api:8bVCltr6/response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.Vue3GoogleOauth.instance.currentUser.get().getAuthResponse().id_token,
          },
          body: JSON.stringify({
            "review_to" : data.review_to,
            "response" : data
          })
        })
      },

      getData() {
        const data = {
          questions: [],
          answers: []
        }

        const resp = {}

        this.questions.forEach(question => {
          if (question.title) {
            let answer = question.answer
            resp[question.id] = answer;
            if (Array.isArray(answer)) {
              answer = answer.join(', ')
            }
            // resp[question.id] = 
            data.questions.push(question.title)
            data.answers.push(answer)
          }
        })

        // return data
        return resp;
      }
    },
    
    watch: {
      'Vue3GoogleOauth.isAuthorized'(us,old) {
        console.log(this.Vue3GoogleOauth.instance.currentUser.get().getAuthResponse());
        console.log(this.Vue3GoogleOauth.instance.currentUser);
        // this.questions[0].answer = this.Vue3GoogleOauth.instance.currentUser.get().getBasicProfile().getEmail();
        this.questions[0].tagline= "Hello " + this.Vue3GoogleOauth.instance.currentUser.get().getBasicProfile().getName();
        this.questions[0].subtitle = "You have logged in with " + this.Vue3GoogleOauth.instance.currentUser.get().getBasicProfile().getEmail();
      }
    },
    
    setup(props) {
      const { isSignIn } = toRefs(props);
      const Vue3GoogleOauth = inject("Vue3GoogleOauth");
      const handleClickLogin = () => {};

      return {
        // questions,
        Vue3GoogleOauth,
        handleClickLogin,
        isSignIn,
      };
    },
  }
</script>

<style lang="css">
  @import '../../src/assets/css/themes/theme-minimal.css';
  /* If using the npm package, use the following lines instead of the one above */
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css'; */
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
</style>