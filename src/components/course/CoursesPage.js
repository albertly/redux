import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: {
                title: "",
                watchHref: ""
            }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);

        this.setStateValues = value => {
            const course = this.state.course;
            course.title = value;
            this.setState({
                course: course
            });    
        };
    }

    onClickSave()  { 
        //alert(`Saving ${this.state.course.title}`);
        this.props.actions.createCourse(this.state.course);
        this.setStateValues("");
    }

    onTitleChange(event) {
        this.setStateValues(event.target.value);
    }

    courseRow(course, index) {
        return (
                <div key={index}>
                    <a href={course.watchHref}> {course.title}</a>
                    <hr></hr>
                </div>
                );
    }

    render() {
        return ( 
            <div>
                <h1> Courses </h1> 
                {this.props.courses.map(this.courseRow)}
                <h2>Add Course</h2>
                    <input type="text" onChange={this.onTitleChange} value={this.state.course.title} />
                    <input type="submit" value="Save" onClick={this.onClickSave} />           
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired    
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);