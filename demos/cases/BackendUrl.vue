<script setup>
import { Tasklist } from "../../src/index.js";
import { RestURL } from "@svar-ui/lib-data-provider";

const url = new RestURL(
	"https://tasklist-backend.svar.dev/tasks/1"
);
const value = url.get();
</script>

<template>
	<div>
		<div class="tasks">
			<Tasklist
				:value="value"
				:onchange="({ action, task, id }) => url.save(action, task, id)"
			/>
		</div>
	</div>
</template>

<style scoped>
.tasks {
	margin: 20px;
	max-width: 768px;
	height: calc(100% - 56px);
}
</style>
