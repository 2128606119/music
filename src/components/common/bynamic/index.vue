<template>
  <div>
    <kinesis-container>
      <kinesis-audio :audioIndex="15">
        <kinesis-element :strength="15" type="depth">
          <slot></slot>
        </kinesis-element>
      </kinesis-audio>
    </kinesis-container>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>

</style>