const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      nameDE : '',
      confNameDE : '',
      firstname : '',
      lastname : '',
      // fullname : '',
    };
  },

  watch : {
      counter(value) {
        if (value == 10) 
          this.counter = 0;
      },
 
    // firstname(firstname) {
    //   this.fullname = firstname + ' ' + this.lastname;
    // },
    // lastname(lastname) {
    //   this.fullname = this.firstname + ' ' + lastname;
    // }
  },

  computed : {
    fullname() { 
      return this.firstname + ' ' + this.lastname;
    },
  },

  methods: {
    increment() {
      this.counter++;
    },
    decrement() {
      this.counter--;
    },

    setName(event) {
      this.name = event.target.value;
    },
    setDEName(event, lastName) {
      this.nameDE = event.target.value + ' ' + lastName;
    },

    submitForm() {
      alert('Submitted');
    },

    confirmInput() {
      this.confNameDE = this.nameDE;
    },

    reset() {
      this.firstname = '';
      this.lastname = '';
    },
  },

});

app.mount('#events');
