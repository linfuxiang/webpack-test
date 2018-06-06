let args = process.argv.slice(2);
var vue_innerText = `<template>
    <div></div>
</template>
<script>
export default {
	name: '${args[0]}',
    data() {
        return {
            
        }
    },
    methods: {

    },
    created() {

    },
    mounted() {

    },
}
</script>
<style scoped lang="scss">
</style>`;

module.exports = vue_innerText