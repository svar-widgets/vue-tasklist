<script setup>
import { ref } from "vue";
import { Tasklist } from "../../src/index.js";
import { getData } from "../data.js";

const prev = localStorage.getItem("--tasklist-demo-data");
const data = ref(prev ? JSON.parse(prev) : getData().data);
const message = ref("");

function callback(action, obj) {
	switch (action) {
		case "add": {
			message.value = `The task "${obj.task.content}" was successfully added`;
			break;
		}
		case "delete": {
			message.value = `The task was successfully deleted`;
			break;
		}
		case "update": {
			message.value = `The task was successfully updated`;
			break;
		}
	}
	localStorage.setItem("--tasklist-demo-data", JSON.stringify(obj.value));
}
</script>

<template>
	<div class="message">{{ message }}</div>
	<div>
		<div class="tasks">
			<Tasklist :value="data" :onchange="e => callback(e.action, e)" />
		</div>
	</div>
</template>

<style scoped>
.message {
	padding: 5px 10px;
	background-color: #eee;
	color: #444;
	line-height: 33px;
	height: 40px;
}
.tasks {
	margin: 20px;
	max-width: 768px;
	height: calc(100% - 56px);
}
</style>
