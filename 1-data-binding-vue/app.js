const app = Vue.createApp({
    data() {
        return {
            header : '<h3>Have a nice day</h3>',
            courseGoals: ["Finish course", "Practice more"],
            vueFramework : ["Vue awesome", "Vue great"],
            vueJsLink: "https://vuejs.org/",
        };
    },

    methods: {
        randomGoals() {
            const random = Math.random();
            if (random < 0.5) {
                return this.vueFramework[0];
            } else {
                return this.vueFramework[1];
            }
        },

        tryHtml() {
            return this.header;
        }
    },
});

app.mount("#user-goal");
