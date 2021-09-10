<template>
    <div :class="`${toggle ? 'show' : ''}`" class="sidebar">
        <button @click="$emit('update:toggle', false)" class="btn-close" />
        <div class="nav-list">
            <nav
                v-for="(item, index) in menu"
                :key="index"
                :class="[`${navIndex === index ? 'active' : ''}`]"
                @click="handleClick(index)">
                {{ item }}
            </nav>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ScrollSpy',
    props: {
        toggle: {
            type: Boolean,
            default: true
        },
        inputRequiredList: {
            type: Array,
            default: () => []
        }
    },
	data: () => ({
        menu: [
            'ResumeInformation',
            'BasicInformation',
            'EducationBackground',
            'WorkExperience',
            'Transportation',
            'SelfAssessment',
            'LanguageLicense',
            'SalaryRequirement',
            'FamilyInformation',
            'OtherInformation',
            'ReferenceCheck',
            'Attachment',
            'SubmitResume'
        ],
        navIndex: 0,
        paddingTop: 0,
        wrapperElement: null,
        pageWrapElement: null
	}),
    mounted() {
        this.wrapperElement = document.querySelector('.wrapper');
        this.pageWrapElement = document.querySelector('.pageWrap');
        this.paddingTop = parseInt(window.getComputedStyle(document.querySelector('.wrapper').parentElement).paddingTop);
        this.pageWrapElement.addEventListener('scroll', this.onScroll);
    },
    methods: {
        handleClick(index) {
            const offsetTop = this.wrapperElement.children[index].offsetTop;

            this.pageWrapElement.scrollTo({ behavior: "smooth", top: offsetTop - this.paddingTop });
            this.$emit('update:toggle', false);
        },
        onScroll(event) {
            const scrollTop = event.target.scrollTop;
            const length = this.wrapperElement.children.length;

            if ((event.target.clientHeight + scrollTop) === event.target.scrollHeight) {
                this.navIndex = length - 1;
                return;
            }

            this.navIndex = length - [...this.wrapperElement.children].reverse().findIndex((item) => {
                return (scrollTop - item.offsetTop + this.paddingTop) >= 0;
            }) - 1;
        }
    },
    destroyed() {
        this.pageWrapElement.removeEventListener('scroll', this.onScroll);
    },
}
</script>
<style lang="scss" scoped>
.sidebar {
    width: 250px;
    height: calc(100% - 155px);
    position: fixed;
    overflow-y: auto;

    .btn-close {
        cursor: pointer;
        display: none;
    }
    nav {
        cursor: pointer;
        padding: 12px 12px 12px 26px;
        position: relative;
        font-size: 16px;
        font-weight: bold;
        line-height: normal;
        border-radius: 6px;
        background-color: #fff;

        &:not(:last-child) { margin-bottom: 8px; }
        &:hover, &.active {
            color: #fff;
            background-color: $pi-color-navbar;
        }
        .red-dot {
            top: 16px;
            left: 12px;
            width: 6px;
            height: 6px;
            position: absolute;
            border-radius: 100%;
            background-color: #ff3d00;
        }
    }
}

@media (max-width: 1280px) {
    .sidebar {
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        padding: 30px 15px;
        z-index: 1300;
        position: fixed;
        max-width: 500px;
        transform: translate3d(-100%, 0px, 0px);
        transition: all .2s linear;
        background-color: #eee;

        &.show { transform: translate3d(0px, 0px, 0px); }
        .btn-close {
            margin: 0 0 24px 26px;
            display: block;
            font-size: 20px;
            margin-left: 26px;
        }
        .nav-list {
            height: calc(100% - 44px);
            overflow-y: auto;
        }
    }
}
</style>