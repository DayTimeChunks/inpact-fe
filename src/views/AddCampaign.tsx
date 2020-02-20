import * as React from "react";
import { IProfileProps } from "../domain/types";
import { Redirect } from "react-router-dom";
import { InputGroup, DropdownButton, Dropdown, FormControl, Form, FormGroup, ButtonToolbar, Button } from "react-bootstrap";


interface IAddCampaignProps {
  loggedIn: boolean;
  // user: IProfileProps;
}

interface IAddCampaignState {
  projectTitle: string;
  categories: any[];
  selectedCategories: string[];
}

export default class AddCampaign extends React.Component<IAddCampaignProps, IAddCampaignState> {

  
  private projectTitle = React.createRef<HTMLInputElement>();
  // private projectCategories = React.createRef<HTMLOListElement>();
  private projectCategories = React.createRef<HTMLOptionsCollection>();

  private userName = React.createRef<HTMLInputElement>();
  private firstName = React.createRef<HTMLInputElement>();
  private lastName = React.createRef<HTMLInputElement>();
  private projectDescription = React.createRef<HTMLTextAreaElement>();

  constructor(props: IAddCampaignProps) {
    super(props)
    this.renderForm = this.renderForm.bind(this)
    this.state = {
      projectTitle : '',
      categories: [
        {text: "Education", id: 1},
        {text: "Environment", id: 2},
        {text: "Governance", id: 3},
        {text: "Health", id: 4},
        {text: "Women", id: 5},
        {text: "Poverty reduction", id: 6},
        {text: "Children", id: 7},
      ],
      selectedCategories: [],
    }
    this.onSelectedCategoriesChange = this.onSelectedCategoriesChange.bind(this)
    this.renderSelectedCategories = this.renderSelectedCategories.bind(this)
    this.removeChoice = this.removeChoice.bind(this)

  }
  private onSelectedCategoriesChange(e: any) {
    const { selectedCategories } = this.state
    const choice = e.target.value
    if (!selectedCategories.includes(choice)) { 
      selectedCategories.push(e.target.value)
      this.setState({ selectedCategories })
    }
  }
  private renderCategories() {
    const { categories } = this.state
    return (
      <div>
      <Form.Label className="font-weight-bold">Project categories</Form.Label>
      <FormGroup>
        {/* value={categories} */}
        <Form.Control as="select" multiple onChange={this.onSelectedCategoriesChange}>
        {categories.map( (option) => (
          <option key={option.id} value={option.text}>
            {option.text}
          </option>
        ))}
      </Form.Control>
      </FormGroup>
      </div>
    )
  }

  private removeChoice(e: any) {
    const {selectedCategories} = this.state
    selectedCategories.splice(selectedCategories.indexOf(e.target.value), 1)
    this.setState({selectedCategories})
  }

  private renderSelectedCategories() {
    const { selectedCategories } = this.state;
    return (
      <div>
      <Form.Label className="font-weight-bold">Selected categories</Form.Label>
      <ButtonToolbar className="mb-3">
        {selectedCategories.map( (cat, indx) => {
          return <Button key={indx} value={cat} variant="outline-dark" onClick={this.removeChoice} className="mx-1 my-1">{`${cat} ⨉`}</Button>
        })}
      </ButtonToolbar>
      </div>
    )
  }

  private renderForm() {
    if (this.props && this.props.loggedIn) {
      return (
        <div id="my-inpact" className="py-5 my-3 white-section">
          <div className="container-fluid border rounded">
            <h2 className="dark-gray-text pt-3">Enter campaign details!</h2>
            <div className="row">
            <div className="col-lg-6 pt-3">
              <label htmlFor='project-title' className="font-weight-bold">
                  Project Title
              </label>
              <input id="project-title" className="rounded form-control" type="text" ref={this.projectTitle} required={true} placeholder="Project Title" defaultValue={this.state.projectTitle}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 pt-3">
            {this.renderCategories()}
          </div>
          <div className="col-lg-6 pt-3">
            <div>
            {this.renderSelectedCategories()}
            </div>
            <label htmlFor='input-surname' className="font-weight-bold">
                Other categories
            </label>
            <input id="other-categories" className="rounded form-control" type="text" required={false} placeholder="Other categories" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 pt-3">
            <label htmlFor='project-description' className="font-weight-bold">
               Project description
            </label>
            <textarea id="input-project-description" className="rounded form-control"  rows={8} cols={80}
                      ref={this.projectDescription} required={false} placeholder="Tell us a bit about your project..."
            />
          </div>
        </div>
        <div className="row my-3 text-center">
          <div className="col">
            <input type="submit" className="btn btn-success px-5" value="Save!"/>
          </div>
        </div>

        </div>
        </div>)
    }
    return <Redirect to='/login'/>
  }

  public render() {
    return (
        <div>
          {this.renderForm()}
        </div>
      )
  }
}