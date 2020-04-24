import Vue from 'vue'
import HomePage from '@/components/HomePage'

describe('HomePage.vue', () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HomePage, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
})
