import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter : new Adapter()})

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
         wrapper = shallow(<NavigationItems />);
    })

    it('22222222222222',() => {
        expect(wrapper.find(NavigationItem)).to.have.lengthOf(2);
    });

    it('33333333333333',() => {
        wrapper.setProps({ isAuthenticated : true });
        expect(wrapper.find(NavigationItem)).to.have.lengthOf(3);
    });

    it('4444444444',() => {
        wrapper.setProps({ isAuthenticated : true });
        expect(wrapper.contains(<NavigationItem link="/logout" >logout  </NavigationItem>)).toEqual(true);
    });
})