import Vue from 'vue'
import About from '@/components/Abbout'

describe('About.vue', () => {
  it("renders props.msg when passed", () => {
    const etx = "New  text";
    const wrapper = shallowMount(About, {
      propsData: { text }
    });
    expect(wrapper.text()).toMatch(text);
  });
})
