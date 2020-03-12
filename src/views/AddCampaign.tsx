import * as React from "react";
import { Button, ButtonToolbar, Card, Form, FormGroup, Table } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { LoremIpsum } from "lorem-ipsum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlusCircle, faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
  timeline: {milestone: string, description: string, start: string}[];
  budget: {title: string, description: string, amount: number}[];
  addMilestone: boolean;
  addBudget: boolean;
  editMilestone?: any;
  editBudget?: any;
  startDate: Date;
  saved: boolean;
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

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

  // Milestones
  private newMilestoneOrder = React.createRef<HTMLInputElement>();
  private newMilestoneName = React.createRef<HTMLTextAreaElement>();
  private newMilestoneDesc = React.createRef<HTMLTextAreaElement>();

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
      timeline: [
        { milestone: lorem.generateSentences(1), description: lorem.generateSentences(3), start: moment().format("DD/MM/YYYY") },
        { milestone: lorem.generateSentences(1), description: lorem.generateSentences(3), start: moment().format("DD/MM/YYYY") },
        { milestone: lorem.generateSentences(1), description: lorem.generateSentences(3), start: moment().format("DD/MM/YYYY") },
        { milestone: lorem.generateSentences(1), description: lorem.generateSentences(3), start: moment().format("DD/MM/YYYY") },
        { milestone: lorem.generateSentences(1), description: lorem.generateSentences(3), start: moment().format("DD/MM/YYYY") },
        { milestone: lorem.generateSentences(1), description: lorem.generateSentences(3), start: moment().format("DD/MM/YYYY") },
        { milestone: lorem.generateSentences(1), description: lorem.generateSentences(3), start: moment().format("DD/MM/YYYY") },
        { milestone: lorem.generateSentences(1), description: lorem.generateSentences(3), start: moment().format("DD/MM/YYYY") },
      ],
      budget: [
        { title: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) /100 },
        { title: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) /100 },
        { title: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) /100 },
        { title: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) /100 },
        { title: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) /100 },
        { title: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) /100 },
        { title: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) /100 },
        { title: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) /100 },
      ],
      addMilestone: false,
      addBudget: false,
      editMilestone: undefined,
      editBudget: undefined,
      startDate: new Date(),
      saved: false,
    }
    this.onSelectedCategoriesChange = this.onSelectedCategoriesChange.bind(this)
    this.renderSelectedItemsSections = this.renderSelectedItemsSections.bind(this)
    this.handleAddCategory = this.handleAddCategory.bind(this)
    this.handleAddAdmins = this.handleAddAdmins.bind(this)
    this.handleAddAmbassadors = this.handleAddAmbassadors.bind(this)
    this.removeChoice = this.removeChoice.bind(this)
    this.saveCampaign = this.saveCampaign.bind(this)
    this.enterMilestone = this.enterMilestone.bind(this)
    this.deleteListItem = this.deleteListItem.bind(this)
    this.handleEditMilestone = this.handleEditMilestone.bind(this)
    this.handleEditBudget = this.handleEditBudget.bind(this)
    this.renderNewMilestone = this.renderNewMilestone.bind(this)
    this.renderEditMilestone = this.renderEditMilestone.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.saveMilestone = this.saveMilestone.bind(this)

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
  private enterMilestone(e: any) {
    e.preventDefault()
    console.log("enterMilestone id", e.currentTarget.id)
    const visible = this.state.addMilestone;
    this.setState({
      addMilestone: visible !== true,
      editMilestone: undefined
    })
  }

  private cancelEdit(e: any) {
    e.preventDefault();
    console.log('cancelEdit, ', e.currentTarget.id)
    switch (true) {
      case (e.currentTarget.id).includes('milestone'):
        this.setState({
          addMilestone: false,
          editMilestone: undefined
        });
      break;
      case (e.currentTarget.id).includes('budget'):
        this.setState({
          addBudget: false,
          editBudget: undefined
        });
      break;
      default:
        break;
    }
  }

  private handleDateChange(date: Date) {
    if (date) this.setState({ startDate: date });
  }

  private saveMilestone(e: any) {
    e.preventDefault()
    const { timeline, editMilestone } = this.state;
    let order = this.newMilestoneOrder.current ? parseInt(this.newMilestoneOrder.current.value) : undefined;
    const milestone = this.newMilestoneName.current ? this.newMilestoneName.current.value : "";
    const description = this.newMilestoneDesc.current ? this.newMilestoneDesc.current.value : "";
    const entry = {
      milestone,
      description,
      start: this.state.startDate.toLocaleString().split(',')[0]
    }
    if (milestone && description) {
      if (order) {
        order = order < 0 ? 0 : order;
        if (editMilestone) {
          const oldOrder = editMilestone.order
          if (oldOrder === order) {
            timeline.splice(order, 1, entry)
          } else {
            timeline.splice(oldOrder, 1) // delete old position
            timeline.splice(order, 0, entry) // insert it in new position
          }
        } else {
          timeline.splice(order, 0, entry)  // adding below
        }
      } else {
        timeline.push(entry)
      }

      this.setState({
        timeline: timeline,
        addMilestone: false,
        editMilestone: undefined,
        saved: false
       })
    }
  }

  private editTableHeader(remove: string, add: string) {
    return (
      <tr>
        <th className="order-width">Order #</th>
        <th>Milestone title</th>
        <th>Description</th>
        <th>Date</th>
        <th>{remove}</th>
        <th>{add}</th>
      </tr>
    )
  }

  private renderNewMilestone() {
    const { timeline } = this.state;
    return (
      <Table striped bordered hover responsive={true}>
        <thead>
          {this.editTableHeader("Cancel", "Add")}
        </thead>
        <tbody>
        <tr>
          <td><input className="rounded form-control" type="number" ref={this.newMilestoneOrder} required={true} placeholder="Order #" defaultValue={timeline.length} /> </td>
          <td><textarea className="rounded form-control" rows={5} cols={50} ref={this.newMilestoneName} required={true} placeholder="Title" />  </td>
          <td className='text-center'><textarea className="rounded form-control" rows={5} cols={90} ref={this.newMilestoneDesc} required={true} placeholder="Description"  /> </td>
          <td><DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}/>
            </td>
          <td className='text-center'>
          <button id='milestone-render-new' onClick={this.enterMilestone} className='button-icon py-1'>
            <FontAwesomeIcon icon={faTrashAlt} size='2x'/>
          </button>
          </td>
          <td className='text-center'>
          <button onClick={this.saveMilestone} className='button-icon py-1'>
            <FontAwesomeIcon icon={faPlusCircle} size='2x'/>
          </button>
          </td>
        </tr>
        </tbody>
      </Table>
    )
  }

  private renderNewBudget() {
    console.log('implement renderNewBudget')
  }

  private renderEditBudget() {
    console.log('implement renderEditBudget')
  }

  private handleEditMilestone(e: any) {
    // Renders the editable area visible
    e.preventDefault();
    let { timeline, editMilestone } = this.state;
    let start;
    if (!editMilestone) {
      const editMilestoneOrder = parseInt(e.currentTarget.value);
      const entry = timeline[editMilestoneOrder]
      start = new Date(entry.start)
      editMilestone = {
        order: editMilestoneOrder,
        ...entry,
        start
      }
    } else {
      editMilestone = undefined
      start = new Date()
    }
    this.setState({
      addMilestone: false,
      editMilestone,
      startDate: start
    })
  }

  private handleEditBudget(e: any) {
    // Renders the editable area visible
    e.preventDefault();
    let { budget, editBudget } = this.state;
    if (!editBudget) {
      const editOrder = parseInt(e.currentTarget.value);
      const entry = budget[editOrder]
      editBudget = {
        order: editOrder,
        ...entry
      }
    } else {
      editBudget = undefined
    }
    this.setState({
      addBudget: false,
      editBudget
    })
  }

  private renderEditMilestone() {
    return (
      <Table striped bordered hover responsive={true}>
        <thead>
          {this.editTableHeader("Cancel", "Save")}
        </thead>
        <tbody>
        <tr>
          <td><input className="rounded form-control" type="number" ref={this.newMilestoneOrder} required={true} placeholder="Order #" defaultValue={this.state.editMilestone.order} /> </td>
          <td><textarea className="rounded form-control" rows={5} cols={50} ref={this.newMilestoneName} required={true} placeholder="Title" defaultValue={this.state.editMilestone.milestone} />  </td>
          <td className='text-center'><textarea className="rounded form-control" rows={5} cols={90} required={true} ref={this.newMilestoneDesc} placeholder="Description" defaultValue={this.state.editMilestone.description}/> </td>
          <td><DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}/>
            </td>
          <td className='text-center'>
          <button id='milestone-cancel-edit' onClick={this.cancelEdit} className='button-icon py-1'>
            <FontAwesomeIcon icon={faTimesCircle} size='2x'/>
          </button>
          </td>
          <td className='text-center'>
          <button onClick={this.saveMilestone} className='button-icon py-1'>
            <FontAwesomeIcon icon={faCheckCircle} size='2x'/>
          </button>
          </td>
        </tr>
        </tbody>
      </Table>
    )
  }

  private deleteListItem(e: any) {
    e.preventDefault()
    const listId = e.currentTarget.id;
    switch (true) {
      case listId.includes('milestone'):
        const { timeline } = this.state;
        timeline.splice(e.currentTarget.value, 1)
        this.setState({ timeline,
          addMilestone: false,
          editMilestone: undefined
         })
        break;
      case listId.includes('budget'):
        const { budget } = this.state;
        budget.splice(e.currentTarget.value, 1);
        this.setState({ budget,
          addBudget: false,
          editBudget: undefined
         })
        break;
      default:
        break;
    }
  }

  private renderTableTimeline() {
    return (
      <Table striped bordered hover responsive={true}>
        <thead>
          <tr>
            <th>#</th>
            <th>Project milestones</th>
            <th>Description</th>
            <th>Date</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
            {this.state.timeline.map( (item, indx) => {
              return (
              <tr key={indx}>
                <td>{indx}</td>
                <td>{item.milestone}</td>
                <td>{item.description}</td>
                <td>{item.start}</td>
                <td className='text-center'>
                  <button value={indx} id={`milestone-${indx}`} className='button-icon py-2 px-2' onClick={this.deleteListItem}>
                    <FontAwesomeIcon icon={faTrashAlt} size='2x'/>
                  </button>
                  <button value={indx} className='button-icon ml-2 px-1' onClick={this.handleEditMilestone}>
                    <FontAwesomeIcon icon={faEdit} size='2x'/>
                  </button>
                  </td>
              </tr>
              )
            })}
        </tbody>
      </Table>
    )
  }
  private renderTableBudget() {
    return (
      <Table striped bordered hover responsive={true}>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Description</th>
            <th>Amount $US</th>
            <th>Amount EUR</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
            {this.state.budget.map( (item, indx) => {
              return (
              <tr key={indx}>
                <td>{indx}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.amount}</td>
                <td>{Math.round(item.amount * 0.9 * 100) / 100}</td>
                <td className='text-center'>
                  <button value={indx} id={`budget-${indx}`} className='button-icon py-2 px-2' onClick={this.deleteListItem}>
                    <FontAwesomeIcon icon={faTrashAlt} size='2x'/>
                  </button>
                  <button value={indx}  className='button-icon ml-2 px-1' onClick={this.handleEditBudget}>
                    <FontAwesomeIcon icon={faEdit} size='2x'/>
                  </button>
                  </td>
              </tr>
              )
            })}
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
                <input type='button' className={(this.state.saved ? "btn btn-secondary" : "btn btn-primary") + " px-5 mx-3"} value={this.state.saved ? "Saved" : "Save!"} onClick={this.saveCampaign} />
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
                <div className="text-right my-2">
                  <Button id='milestone-new-green'
                    variant={this.state.addMilestone || this.state.editMilestone!! ? "secondary" : "success"} 
                    value={undefined} 
                    onClick={this.state.addMilestone || this.state.editMilestone!! ? this.cancelEdit : this.enterMilestone}>
                    {this.state.addMilestone || this.state.editMilestone!! ? "Cancel": "Enter new milestone"}
                  </Button>
                </div>
                {this.state.addMilestone ? this.renderNewMilestone() : undefined}
                {this.state.editMilestone ? this.renderEditMilestone() : undefined}
                </div>
              </div>
              {/* Budget */}
              <div className="row px-3">
                <div className="col-lg-12 pt-3 px-3">
                  <label htmlFor='timeline' className="font-weight-bold mt-3">
                    Budget</label>
                  {this.renderTableBudget()}
                <div className="text-right my-2">
                  <Button 
                    variant={this.state.addBudget || this.state.editBudget!! ? "secondary" : "success"} 
                    value={undefined} 
                    onClick={this.enterMilestone}>
                    {this.state.addBudget || this.state.editBudget!! ? "Cancel": "Enter new budget item"}
                  </Button>
                </div>
                {this.state.addBudget ? this.renderNewBudget() : undefined}
                {this.state.editBudget ? this.renderEditBudget() : undefined}
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