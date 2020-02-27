import * as React from "react";
import { Button, ButtonToolbar, Card, Form, FormGroup, Table } from "react-bootstrap";
import { Redirect } from "react-router-dom";

/**
 * TODOs:
 * 1) saveCampaign(): Send saved state to backend on saveCampaign()
 * 2) handleSubmit(): Submit form, sending final info to abckend and redirecting to campaign page
 */
interface IAddCampaignProps {
  loggedIn: boolean;
  // user: IProfileProps;
}

interface IAddCampaignState {
  projectTitle: string;
  shortDescription: string;
  summary: string;
  background: string;
  detailedDescription: string;
  projectImpact: string;
  totalBudget: number;
  categories: any[];
  selectedCategories: string[];
  organizationName: string;
  organizationDescription: string;
  organizationWebsite: string;
  projectAdministrators: string[];
  projectAmbassadors: string[];
  saved: boolean;
}

export default class AddCampaign extends React.Component<IAddCampaignProps, IAddCampaignState> {

  // Basic info
  private projectTitle = React.createRef<HTMLInputElement>();
  private shortDescription = React.createRef<HTMLInputElement>();
  private summary = React.createRef<HTMLTextAreaElement>();
  private addCategory = React.createRef<HTMLInputElement>();
  private totalBudget = React.createRef<HTMLInputElement>();

  // Details
  private background = React.createRef<HTMLTextAreaElement>();
  private detailedDescription = React.createRef<HTMLTextAreaElement>();
  private projectImpact = React.createRef<HTMLTextAreaElement>();
  private organizationName = React.createRef<HTMLInputElement>();
  private organizationDescription = React.createRef<HTMLTextAreaElement>();
  private organizationWebsite = React.createRef<HTMLInputElement>();
  private addAdmins = React.createRef<HTMLInputElement>();
  private addAmbassadors = React.createRef<HTMLInputElement>();

  constructor(props: IAddCampaignProps) {
    super(props)
    this.renderForm = this.renderForm.bind(this)
    this.state = {
      projectTitle: '',
      shortDescription: '',
      summary: '',
      background: '',
      detailedDescription: '',
      projectImpact: '',
      totalBudget: 0.0,
      categories: [
        { text: "Education", id: 1 },
        { text: "Environment", id: 2 },
        { text: "Governance", id: 3 },
        { text: "Health", id: 4 },
        { text: "Women", id: 5 },
        { text: "Poverty reduction", id: 6 },
        { text: "Children", id: 7 },
      ],
      selectedCategories: [],
      organizationName: '',
      organizationDescription: '',
      organizationWebsite: '',
      projectAdministrators: [],
      projectAmbassadors: [],
      saved: false,
    }
    this.onSelectedCategoriesChange = this.onSelectedCategoriesChange.bind(this)
    this.renderSelectedItemsSections = this.renderSelectedItemsSections.bind(this)
    this.handleAddCategory = this.handleAddCategory.bind(this)
    this.handleAddAdmins = this.handleAddAdmins.bind(this)
    this.handleAddAmbassadors = this.handleAddAmbassadors.bind(this)
    this.removeChoice = this.removeChoice.bind(this)
    this.saveCampaign = this.saveCampaign.bind(this)

  }
  private onSelectedCategoriesChange(e: any) {
    const { selectedCategories } = this.state
    const choice = e.target.value
    if (!selectedCategories.includes(choice)) {
      selectedCategories.push(e.target.value)
      this.setState({ selectedCategories, saved: false })
    }
  }
  private renderCategories() {
    const { categories } = this.state
    return (
      <div>
        <Form.Label className="font-weight-bold mt-3">Project categories</Form.Label>
        <FormGroup>
          {/* value={categories} */}
          <Form.Control as="select" multiple onChange={this.onSelectedCategoriesChange}>
            {categories.map((option) => (
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
    const { selectedCategories } = this.state
    selectedCategories.splice(selectedCategories.indexOf(e.target.value), 1)
    this.setState({ selectedCategories, saved: false })
  }

  private renderSelectedItemsSections(section: 'categories' | 'admins' | 'ambassadors') {
    const { selectedCategories, projectAdministrators, projectAmbassadors } = this.state;
    const selectionArray = section === 'categories' ? selectedCategories : section === 'admins' ? projectAdministrators : projectAmbassadors;
    const selection = () => {
      if (selectionArray.length > 0) {
        return (
          <ButtonToolbar className="mb-3">
            {selectionArray.map((cat, indx) => {
              return <Button key={indx} value={cat} variant="outline-dark" onClick={this.removeChoice} className="mx-1 my-1">{`${cat} ⨉`}</Button>
            })}
          </ButtonToolbar>
        )
      }
      return (
        <Card.Text className="text-center">
          No {section} chosen yet :(
          </Card.Text>
      )
    }
    return (
      <div>
        <Form.Label className="font-weight-bold mt-3">Chosen project {section}</Form.Label>
        <Card>
          <Card.Body>
            {selection()}
          </Card.Body>
        </Card>
      </div>)
  }

  private handleAddCategory() {
    const { selectedCategories } = this.state
    const choice = this.addCategory ? this.addCategory.current!.value : undefined

    if (choice && !selectedCategories.includes(choice)) {
      selectedCategories.push(choice)
      this.setState({ selectedCategories, saved: false })
    }
    this.addCategory.current!.value = '';
  }

  private handleAddAdmins() {
    const { projectAdministrators } = this.state
    const choice = this.addAdmins ? this.addAdmins.current!.value : undefined

    if (choice && !projectAdministrators.includes(choice)) {
      projectAdministrators.push(choice)
      this.setState({ projectAdministrators, saved: false })
    }
    this.addAdmins.current!.value = '';
  }
  private handleAddAmbassadors() {
    const { projectAmbassadors } = this.state
    const choice = this.addAmbassadors ? this.addAmbassadors.current!.value : undefined

    if (choice && !projectAmbassadors.includes(choice)) {
      projectAmbassadors.push(choice)
      this.setState({ projectAmbassadors, saved: false })
    }
    this.addAmbassadors.current!.value = '';
  }

  private renderTableTimeline() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Project milestones</th>
            <th>Description</th>
            <th>Starting date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td><Button>Edit row</Button> <Button>Add row above</Button> <Button>Delete row</Button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td><Button>Edit row</Button> <Button>Add row above</Button> <Button>Delete row</Button></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td><Button>Edit row</Button> <Button>Add row above</Button> <Button>Delete row</Button></td>
          </tr>
        
        </tbody>
      </Table>
    )
  }

  private saveCampaign() {
    // TODO: Send saved state to backend
    console.log('save state in backend', this.state)
    this.setState({ saved: true })
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: send completed form to backend and redirect to project page to view
  }

  private renderForm() {
    if (this.props && this.props.loggedIn) {
      return (
        <form onSubmit={this.handleSubmit}>

          <div id="my-inpact" className="py-5 my-3 px-3 white-section">
            <div className="row text-right pt-3 ">
              <div className="col fixed-campaign-buttons">
                <input type='button' className={(this.state.saved ? "btn btn-secondary" : "btn btn-primary") + " px-5 mx-3"} value="Save" onClick={this.saveCampaign} />
                <input type="submit" className="btn btn-success px-5 mx-3" value="Submit" />
              </div>
            </div>
            {/* Basic information */}
            <div className="container-fluid border rounded py-3 my-3 project-basic-info">
              <h2 className="dark-gray-text px-3 pt-3">Basic information</h2>
              <div className="row px-3">
                <div className="col-lg-6 pt-3 px-3">
                  <label htmlFor='project-title' className="font-weight-bold">
                    Project Title</label>
                  <input id="project-title" className="rounded form-control" type="text" ref={this.projectTitle} required={true} placeholder="Project Title" defaultValue={this.state.projectTitle} />
                  {this.renderCategories()}
                  {this.renderSelectedItemsSections('categories')}
                  <div>
                    <label htmlFor='other-categories' className="font-weight-bold mt-3">
                      Other categories</label>
                    <input id="other-categories" className="rounded form-control" type="text" ref={this.addCategory} required={false} placeholder="Other categories" />
                    <Button className="btn btn-primary mt-2" onClick={this.handleAddCategory}>Add</Button>
                  </div>
                  <div>
                    <label htmlFor='total-budget' className="font-weight-bold mt-3">
                      Total budget</label>
                    <input id="total-budget" ref={this.totalBudget} defaultValue={this.state.totalBudget} type="number" required={false} className="rounded form-control" placeholder="Total budget" />
                  </div>
                </div>
                <div className="col-lg-6 pt-3 px-3">
                  <label htmlFor='short-description' className="font-weight-bold">
                    Short description (max 125 characters)</label>
                  <input id="short-description" className="rounded form-control" type="text" maxLength={160} ref={this.shortDescription} required={true} placeholder="Your goal in little less than 25 words..." defaultValue={this.state.shortDescription} />
                  <label htmlFor='summary' className="font-weight-bold mt-3">
                    Summary (max 1000 characters)</label>
                  <textarea id="input-summary" className="rounded form-control" rows={17} cols={80} maxLength={1000}
                    ref={this.summary} required={false} placeholder="Tell us a bit about your project..." />
                </div>
              </div>
            </div>
            {/* Details */}
            <div className="container-fluid border rounded py-3 my-3 ">
              <h2 className="dark-gray-text px-3 pt-3">Project details</h2>
              <div className="row px-3">
                <div className="col-lg-6 pt-3 px-3">
                  <label htmlFor='background' className="font-weight-bold mt-3">
                    Background and context</label>
                  <textarea id="background" className="rounded form-control" rows={17} cols={80} ref={this.background} required={false} placeholder="Tell the community more about the background of the project and the history behind and how you came up with this project." />
                  <label htmlFor='detailed-description' className="font-weight-bold mt-3">
                    Detailed project description</label>
                  <textarea id="detailed-description" className="rounded form-control" rows={17} cols={80} ref={this.detailedDescription} required={false} placeholder="Tell the community more about tinformation about the project. For example, what do you aim to do? What do you want to achieve?" />
                  <label htmlFor='project-impact' className="font-weight-bold mt-3">
                    Project impact</label>
                  <textarea id="project-impact" className="rounded form-control" rows={7} cols={80} ref={this.projectImpact} required={false} placeholder="Tell the community what will be the impact of your project on the community you work in." />
                </div>
                <div className="col-lg-6 pt-3 px-3">
                  <label htmlFor='location' className="font-weight-bold mt-3">
                    Location</label>
                  <input id="location" className="rounded form-control" type="text" required={false} placeholder="Location" defaultValue={''} />
                  <label htmlFor='organization-name' className="font-weight-bold mt-3">
                    Your organization's name </label>
                  <input id="organization-name" className="rounded form-control" type="text" required={false} ref={this.organizationName} placeholder="Title of your organization" />
                  <label htmlFor='organization-description' className="font-weight-bold mt-3">
                    Organization's description </label>
                  <textarea id="organization-description" className="rounded form-control" rows={7} cols={80} required={false} ref={this.organizationDescription} placeholder="Describe your organisation and your competences for this project. What makes you the a great local partner to conduct this project?" />
                  <label htmlFor='organization-website' className="font-weight-bold mt-3">
                    Organization's website </label>
                  <input id="organization-website" className="rounded form-control" type="text" required={false} ref={this.organizationWebsite} placeholder="Website, Facebook or any other social media site" />
                  <div>
                    {this.renderSelectedItemsSections('admins')}
                    <input id="project-administrators" className="rounded form-control mt-3" type="text" ref={this.addAdmins} required={false} placeholder="Admin's email, which will be able to edit." />
                    <Button className="btn btn-primary mt-2" onClick={this.handleAddAdmins}>Add</Button>
                  </div>
                  <div>
                    {this.renderSelectedItemsSections('ambassadors')}
                    <input id="project-ambassadors" className="rounded form-control mt-3" type="text" ref={this.addAmbassadors} required={false} placeholder="Ambassador's email, which will defend this project." />
                    <Button className="btn btn-primary mt-2" onClick={this.handleAddAmbassadors}>Add</Button>
                  </div>
                </div>
              </div>
              {/* Timeline */}
              <div className="row px-3">
                <div className="col-lg-12 pt-3 px-3">
                  <label htmlFor='timeline' className="font-weight-bold mt-3">
                    Timeline</label>
                  {this.renderTableTimeline()}
                </div>

              </div>
            </div>


          </div>
        </form>
      )
    }
    return <Redirect to='/login' />
  }

  public render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    )
  }
}