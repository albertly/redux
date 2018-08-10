import React, {PropTypes} from 'react';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            course: { title: "" }
        };
        
