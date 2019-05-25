import React, { Component } from "react";

import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import Button from "../components/Button";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

      agendamento: {
        dataInicio: "",
        dataFim: "",
        observacao: "",
        quadraSelecionada: "",
        grupoSelecionado: "",
      },
     
      grupos: [],
      quadras: []

    };
    this.handleDataInicio = this.handleDataInicio.bind(this);
    this.handleDataFim = this.handleDataFim.bind(this);
    this.handleQuadra = this.handleQuadra.bind(this);
    this.handleGrupo = this.handleGrupo.bind(this);
    this.handleObservacao = this.handleObservacao.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  componentDidMount() {
    fetch("http://controlequadra.herokuapp.com/api/quadra")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let quadrasApi = data.map(quadra => { return { value: quadra.id, display: quadra.nome } })
        this.setState({ quadras: quadrasApi });
      }).catch(error => {
        console.log(error);
      });

      fetch("http://controlequadra.herokuapp.com/api/grupo")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let gruposApi = data.map(grupo => { return { value: grupo.id, display: grupo.nome } })
        this.setState({ grupos: gruposApi });
      }).catch(error => {
        console.log(error);
      });
  }

  handleDataInicio(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        agendamento: {
          ...prevState.agendamento,
          dataInicio: value
        }
      })
    );
  }

  handleDataFim(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        agendamento: {
          ...prevState.agendamento,
          dataFim: value
        }
      })
    );
  }

  handleQuadra(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        agendamento: {
          ...prevState.agendamento,
          quadraSelecionada: value
        }
      })
    );
  }

  handleGrupo(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        agendamento: {
          ...prevState.agendamento,
          grupoSelecionado: value
        }
      })
    );
  }

  handleObservacao(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        agendamento: {
          ...prevState.agendamento,
          observacao: value
        }
      })
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.agendamento;
    console.log(userData);

    fetch("http://controlequadra.herokuapp.com/api/agendamento", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      });
    });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      agendamento: {
        dataFim: "",
        dataInicio: "",
        quadraSelecionada: "",
        grupoSelecionado: "",
        observacao: ""
      }
    });
  }

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Select
          title={"Quadra"}
          name={"quadra"}
          options={this.state.quadras}
          value={this.state.quadraSelecionada}
          placeholder={"Selecione uma quadra"}
          handleChange={this.handleQuadra}
        />{" "}
        <Select
          title={"Grupo"}
          name={"grupo"}
          options={this.state.grupos}
          value={this.state.grupoSelecionado}
          placeholder={"Selecione um grupo"}
          handleChange={this.handleGrupo}
        />{" "}
        <Input
          inputType={"date"}
          title={"Data Inicio"}
          name={"dataInicio"}
          value={this.state.dataInicio}
          handleChange={this.handleDataInicio}
        />{" "}
        {/* Name of the user */}
        <Input
          inputType={"date"}
          name={"dataFim"}
          title={"Data Fim"}
          value={this.state.dataFim}
          handleChange={this.handleDataFim}
        />{" "}
        <TextArea
          title={"Observações"}
          rows={10}
          value={this.state.observacoes}
          name={"currentPetInfo"}
          handleChange={this.handleObservacao}
          placeholder={"Digite alguma observação sobre o agendamento"}
        />
        {/* About you */}
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Cadastrar"}
          style={buttonStyle}
        />{" "}
        {/*Submit */}
        <Button
          action={this.handleClearForm}
          type={"secondary"}
          title={"Limpar registros"}
          style={buttonStyle}
        />{" "}
        {/* Clear the form */}
      </form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;
