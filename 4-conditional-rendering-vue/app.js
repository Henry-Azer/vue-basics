const app = Vue.createApp({
    data() {
        return {
            goal: "",
            goals: [],
        };
    },

    methods: {
        addGoal() {
            this.goals.push(this.goal);
            this.goal = "";
        },
        removeGoal(index) {
            if (index !== -1) this.goals.splice(index, 1);
        },
    },
});

app.mount("#user-goals");
