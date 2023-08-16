import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import geojson from '../../../assets/seoul_municipalities_geo_simple.json';

const mockData = {
  gangnam: 8,
  gangdong: 3,
  gangbuk: 4,
  gangseo: 2,
  gwanak: 7,
  gwangjin: 6,
  guro: 1,
  geumcheon: 9,
  nowon: 10,
  dobong: 5,
  dongdaemun: 7,
  dongjak: 4,
  mapo: 2,
  seodaemun: 3,
  seocho: 6,
  seongdong: 8,
  seongbuk: 1,
  songpa: 5,
  yangcheon: 9,
  yeongdeungpo: 10,
  yongsan: 7,
  eunpyeong: 4,
  jongno: 2,
  jung: 3,
  jungnang: 6,
};

const Map = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = 800;
    const height = 600;

    const projection = d3.geoMercator().fitSize([width, height], geojson);

    const pathGenerator = d3.geoPath().projection(projection);

    const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0, 10]);

    svg
      .selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .style('fill', (d) => {
        const districtName = d.properties.name_eng
          .replace(/-gu/g, '')
          .toLowerCase();
        return colorScale(mockData[districtName] || 0);
      })
      .style('stroke', 'white');
  }, []);

  return <svg ref={svgRef} width={800} height={600}></svg>;
};

export default Map;
