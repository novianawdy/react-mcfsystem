import React, { Component } from "react";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import getLang from "../../lib/getLang";

class CustomChart extends Component {
  render() {
    const { data } = this.props;
    return (
      <Chart
        height={window.innerHeight - 64}
        data={data}
        padding={[20, 50, 60, 80]}
        forceFit
        scale={{
          created_at: {
            type: "time",
            mask: "HH:mm:ss",
          },
        }}
      >
        <Legend
          custom={true}
          items={[
            {
              value: getLang({ id: "temperature" }),
              fill: "red",
            },
            { value: getLang({ id: "flow" }), fill: "blue" },
          ]}
        />
        <Axis name="created_at" />
        <Axis
          name="temperature"
          label={{
            formatter: (val) => `${val}°C`,
            textStyle: {
              fontSize: "12px",
            },
          }}
        />
        <Axis
          name="flow"
          label={{
            formatter: (val) => `${val} L/h`,
            textStyle: {
              fontSize: "12px",
            },
          }}
        />
        <Tooltip
          crosshairs={{
            type: "y",
          }}
        />
        <Geom
          type="line"
          position="created_at*flow"
          tooltip={[
            "created_at*flow",
            (created_at, flow) => {
              // title: created_at,
              return {
                name: getLang({ id: "flow" }),
                value: `${flow} L/h`,
              };
            },
          ]}
          size={2}
          color={"blue"}
          shape={"smooth"}
        />
        <Geom
          type="point"
          position="created_at*flow"
          tooltip={[
            "created_at*flow",
            (created_at, flow) => {
              // title: created_at,
              return {
                name: getLang({ id: "flow" }),
                value: `${flow} L/h`,
              };
            },
          ]}
          size={4}
          shape={"circle"}
          color={"blue"}
          style={{
            stroke: "#fff",
            lineWidth: 1,
          }}
        />
        <Geom
          type="line"
          position="created_at*temperature"
          tooltip={[
            "created_at*temperature",
            (created_at, temperature) => {
              return {
                // title: created_at,
                name: getLang({ id: "temperature" }),
                value: `${temperature}°C`,
              };
            },
          ]}
          size={2}
          color={"red"}
          shape={"smooth"}
        />
        <Geom
          type="point"
          position="created_at*temperature"
          tooltip={[
            "created_at*temperature",
            (created_at, temperature) => {
              return {
                // title: created_at,
                name: getLang({ id: "temperature" }),
                value: `${temperature}°C`,
              };
            },
          ]}
          size={4}
          shape={"circle"}
          color={"red"}
          style={{
            stroke: "#fff",
            lineWidth: 1,
          }}
        />
      </Chart>
    );
  }
}

export default CustomChart;
