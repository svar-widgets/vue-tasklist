<script setup>
defineOptions({ name: "TaskItem" });
import { ref, watchEffect, inject } from 'vue';
import { Checkbox } from '@svar-ui/vue-core';
import { clickOutside } from '@svar-ui/lib-dom';
import { asDirective } from '@svar-ui/lib-vue';

const vClickOutside = asDirective(clickOutside);

const props = defineProps({
  task: {},
  edit: {},
  readonly: {},
  onupdate: { type: Function },
  onremove: { type: Function },
  onedit: { type: Function },
});

const locale = inject('wx-i18n');
const _ = locale.getGroup('tasklist');

const textarea = ref(null);

function adjustHeight() {
  textarea.value.style.height = textarea.value.scrollHeight + 2 + 'px';
}

let content = '';
function handleContent() {
  content = textarea.value.value;
  adjustHeight();
}

function handleStatus({ value }) {
  props.onupdate?.({
    task: props.task,
    status: value ? 1 : 0,
    content: content || props.task.content,
  });
}

function saveTask(next) {
  props.onupdate?.({ task: props.task, content: content, status: props.task.status, next });
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    props.onupdate?.({ task: props.task, status: props.task.status, content: '' });
  } else if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    saveTask(true);
  }
}

watchEffect(() => {
  if (textarea.value) {
    content = textarea.value.value = props.task.content;
    textarea.value.focus();
    adjustHeight();
  }
});

function handleEditClick() {
  props.onedit?.(props.task.id);
}
</script>

<template>
  <div class="wx-task" :class="{ 'wx-done': task.status }">
    <div class="wx-checkbox-wrapper">
      <template v-if="edit === task.id && task.id === -1">
        <div class="wx-icon-add"><i class="wxi-plus"></i></div>
      </template>
      <template v-else>
        <Checkbox :onchange="handleStatus" :value="task.status" />
      </template>
    </div>

    <div class="wx-wrapper">
      <template v-if="edit === task.id">
        <textarea
          ref="textarea"
          class="wx-texarea"
          :placeholder="_('Enter the task...')"
          v-click-outside="saveTask"
          @keydown="handleKeydown"
          @input="handleContent"
        ></textarea>
      </template>
      <template v-else>
        <div class="wx-text-wrapper" @dblclick="() => onedit(task.id)">
          <span class="wx-text">{{ task.content }}</span>
        </div>
      </template>
    </div>

    <div class="wx-icon-edit">
      <template v-if="!readonly && edit !== task.id">
        <i class="wxi-edit" @click="handleEditClick"></i>
      </template>
    </div>

    <div class="wx-icon-close">
      <template v-if="!readonly && edit !== task.id">
        <i class="wxi-close" @click="() => onremove(task.id)"></i>
      </template>
    </div>
  </div>
</template>

<style scoped>
.wx-task {
  display: flex;
  padding: 8px 0 4px;
  height: fit-content;
}

.wx-task {
  border-top: 1px solid var(--wx-color-disabled);
}

.wx-task:last-child {
  border-bottom: 1px solid var(--wx-color-disabled);
}

.wx-checkbox-wrapper :deep(label span:first-child:before) {
  border-radius: 50%;
}

.wx-task.wx-done
  .wx-checkbox-wrapper
  :deep(input:checked ~ label span:first-child:before) {
  background: #00d19a;
}

.wx-wrapper {
  flex: 1;
  min-height: 20px;
  margin-left: 16px;
  min-height: 30px;
  height: fit-content;
  overflow: hidden;
  margin-top: -5px;
}

.wx-texarea {
  display: block;
  width: 100%;
  resize: none;
  outline: none;
  height: 30px;
  font-family: var(--wx-input-font-family);
  font-size: var(--wx-input-font-size);
  line-height: var(--wx-input-line-height);
  font-weight: var(--wx-input-font-weigth);
  text-align: var(--wx-input-text-align);
  color: var(--wx-input-font-color);
  border: var(--wx-input-border);
  border-radius: var(--wx-input-border-radius);
  background: var(--wx-input-background);
  padding: var(--wx-input-padding);
  box-sizing: border-box;
  word-wrap: break-word;
  overflow: hidden;
}

.wx-texarea:focus {
  border: var(--wx-input-border-focus);
}

.wx-texarea::placeholder {
  color: var(--wx-input-placeholder-color);
}

.wx-text-wrapper {
  padding: var(--wx-input-padding);
  border: var(--wx-input-border);
  border: 1px solid transparent;
  border-radius: 3px;
  width: 100%;
  min-height: 30px;
}

.wx-text {
  word-wrap: break-word;
}

.wx-done .wx-text {
  text-decoration: line-through;
  opacity: 0.6;
}

.wx-task:hover .wx-icon-close {
  opacity: 1;
}

.wx-icon-add {
  font-size: var(--wx-checkbox-size);
  color: var(--wx-color-font-alt);
}

.wx-icon-edit {
  color: var(--wx-color-font-alt);
  margin-left: 8px;
  font-size: 20px;
  height: 20px;
  width: 20px;
  opacity: 0;
  transition: 0.3s linear;
  display: none;
}

.wx-icon-edit .wxi-edit {
  cursor: pointer;
}

.wx-icon-edit .wxi-edit:hover {
  color: var(--wx-color-primary);
}

@media (hover: none) {
  .wx-icon-edit {
    display: block;
  }

  .wx-task:hover .wx-icon-edit {
    opacity: 1;
  }
}

.wx-icon-close {
  color: var(--wx-color-font-alt);
  margin-left: 8px;
  font-size: 20px;
  height: 20px;
  width: 20px;
  opacity: 0;
  transition: 0.3s linear;
}

.wx-icon-close .wxi-close {
  cursor: pointer;
}

.wx-icon-close .wxi-close:hover {
  color: var(--wx-color-danger);
}
</style>
