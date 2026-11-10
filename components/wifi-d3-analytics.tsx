'use client'

import React, { useEffect, useRef, useState, useId } from 'react'
import * as d3 from 'd3'
import {
  TrendingUp,
  Clock,
  Activity,
  Cpu,
  Wifi,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Zap
} from 'lucide-react'

// ==========================================
// DATA TYPES
// ==========================================
export interface DailyRevenuePoint {
  date: string // e.g. "2026-10-18"
  displayDate: string // e.g. "18 Okt"
  revenueTzs: number
  transactions: number
  voucherSales: number
  mobileMoneySales: number
}

export interface HourlyTrafficPoint {
  hour: number // 0 - 23
  label: string // e.g. "08:00"
  activeClients: number
  bandwidthMbps: number
  status: 'quiet' | 'normal' | 'busy' | 'peak'
}

export interface RouterTelemetryPoint {
  timestamp: string // e.g. "10:00"
  hourNum: number
  ccr2004Cpu: number
  ccr2004Throughput: number
  ccr2004Sessions: number

  hexSCpu: number
  hexSThroughput: number
  hexSSessions: number

  unifiU6Cpu: number
  unifiU6Throughput: number
  unifiU6Sessions: number

  omadaCpu: number
  omadaThroughput: number
  omadaSessions: number
}

// Generate realistic 30-day revenue data for Altavox WiFi
const generateRevenueData = (daysCount: number): DailyRevenuePoint[] => {
  const result: DailyRevenuePoint[] = []
  const now = new Date()

  const monthsSw = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ago', 'Sep', 'Okt', 'Nov', 'Des']

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(now.getDate() - i)
    const dayOfWeek = d.getDay() // 0 = Sun, 6 = Sat
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Weekends see 30-50% traffic surges in student hostels & cafes
    const baseRevenue = isWeekend ? 340000 : 210000
    const variance = Math.floor(Math.sin(i * 0.7) * 45000 + Math.random() * 35000)
    const revenueTzs = Math.max(120000, baseRevenue + variance)

    const avgTicket = 1500
    const transactions = Math.floor(revenueTzs / avgTicket)
    const mobileMoneyShare = 0.72 + (Math.random() * 0.08 - 0.04)
    const mobileMoneySales = Math.floor(revenueTzs * mobileMoneyShare)
    const voucherSales = revenueTzs - mobileMoneySales

    const dayNum = d.getDate().toString().padStart(2, '0')
    const monthName = monthsSw[d.getMonth()]

    result.push({
      date: d.toISOString().split('T')[0],
      displayDate: `${dayNum} ${monthName}`,
      revenueTzs,
      transactions,
      voucherSales,
      mobileMoneySales
    })
  }

  return result
}

// 24-Hour Connection Pattern (Dar es Salaam peak times: 18:00 - 22:30 evening rush)
const HOURLY_TRAFFIC_DATA: HourlyTrafficPoint[] = [
  { hour: 0, label: '00:00', activeClients: 42, bandwidthMbps: 28, status: 'quiet' },
  { hour: 1, label: '01:00', activeClients: 26, bandwidthMbps: 18, status: 'quiet' },
  { hour: 2, label: '02:00', activeClients: 15, bandwidthMbps: 11, status: 'quiet' },
  { hour: 3, label: '03:00', activeClients: 12, bandwidthMbps: 8, status: 'quiet' },
  { hour: 4, label: '04:00', activeClients: 18, bandwidthMbps: 14, status: 'quiet' },
  { hour: 5, label: '05:00', activeClients: 36, bandwidthMbps: 25, status: 'normal' },
  { hour: 6, label: '06:00', activeClients: 74, bandwidthMbps: 58, status: 'normal' },
  { hour: 7, label: '07:00', activeClients: 128, bandwidthMbps: 95, status: 'busy' },
  { hour: 8, label: '08:00', activeClients: 165, bandwidthMbps: 130, status: 'busy' },
  { hour: 9, label: '09:00', activeClients: 184, bandwidthMbps: 152, status: 'busy' },
  { hour: 10, label: '10:00', activeClients: 198, bandwidthMbps: 165, status: 'busy' },
  { hour: 11, label: '11:00', activeClients: 215, bandwidthMbps: 180, status: 'busy' },
  { hour: 12, label: '12:00', activeClients: 258, bandwidthMbps: 218, status: 'peak' }, // Lunch rush
  { hour: 13, label: '13:00', activeClients: 270, bandwidthMbps: 232, status: 'peak' },
  { hour: 14, label: '14:00', activeClients: 230, bandwidthMbps: 195, status: 'busy' },
  { hour: 15, label: '15:00', activeClients: 242, bandwidthMbps: 204, status: 'busy' },
  { hour: 16, label: '16:00', activeClients: 278, bandwidthMbps: 240, status: 'peak' },
  { hour: 17, label: '17:00', activeClients: 310, bandwidthMbps: 285, status: 'peak' }, // Evening rush starts
  { hour: 18, label: '18:00', activeClients: 355, bandwidthMbps: 330, status: 'peak' },
  { hour: 19, label: '19:00', activeClients: 388, bandwidthMbps: 368, status: 'peak' },
  { hour: 20, label: '20:00', activeClients: 412, bandwidthMbps: 395, status: 'peak' }, // Mega peak
  { hour: 21, label: '21:00', activeClients: 396, bandwidthMbps: 380, status: 'peak' },
  { hour: 22, label: '22:00', activeClients: 280, bandwidthMbps: 250, status: 'busy' },
  { hour: 23, label: '23:00', activeClients: 115, bandwidthMbps: 98, status: 'normal' }
]

// 12-Hour Router Telemetry Samples
const ROUTER_TELEMETRY_SERIES: RouterTelemetryPoint[] = [
  { timestamp: '08:00', hourNum: 8, ccr2004Cpu: 18, ccr2004Throughput: 130, ccr2004Sessions: 165, hexSCpu: 24, hexSThroughput: 38, hexSSessions: 44, unifiU6Cpu: 20, unifiU6Throughput: 52, unifiU6Sessions: 68, omadaCpu: 15, omadaThroughput: 22, omadaSessions: 32 },
  { timestamp: '09:00', hourNum: 9, ccr2004Cpu: 22, ccr2004Throughput: 152, ccr2004Sessions: 184, hexSCpu: 29, hexSThroughput: 44, hexSSessions: 51, unifiU6Cpu: 24, unifiU6Throughput: 61, unifiU6Sessions: 76, omadaCpu: 18, omadaThroughput: 26, omadaSessions: 36 },
  { timestamp: '10:00', hourNum: 10, ccr2004Cpu: 25, ccr2004Throughput: 165, ccr2004Sessions: 198, hexSCpu: 32, hexSThroughput: 49, hexSSessions: 56, unifiU6Cpu: 28, unifiU6Throughput: 67, unifiU6Sessions: 82, omadaCpu: 21, omadaThroughput: 29, omadaSessions: 40 },
  { timestamp: '11:00', hourNum: 11, ccr2004Cpu: 28, ccr2004Throughput: 180, ccr2004Sessions: 215, hexSCpu: 35, hexSThroughput: 54, hexSSessions: 62, unifiU6Cpu: 31, unifiU6Throughput: 74, unifiU6Sessions: 89, omadaCpu: 23, omadaThroughput: 32, omadaSessions: 44 },
  { timestamp: '12:00', hourNum: 12, ccr2004Cpu: 36, ccr2004Throughput: 218, ccr2004Sessions: 258, hexSCpu: 42, hexSThroughput: 66, hexSSessions: 74, unifiU6Cpu: 38, unifiU6Throughput: 89, unifiU6Sessions: 106, omadaCpu: 29, omadaThroughput: 39, omadaSessions: 52 },
  { timestamp: '13:00', hourNum: 13, ccr2004Cpu: 38, ccr2004Throughput: 232, ccr2004Sessions: 270, hexSCpu: 44, hexSThroughput: 71, hexSSessions: 78, unifiU6Cpu: 41, unifiU6Throughput: 95, unifiU6Sessions: 112, omadaCpu: 31, omadaThroughput: 42, omadaSessions: 55 },
  { timestamp: '14:00', hourNum: 14, ccr2004Cpu: 31, ccr2004Throughput: 195, ccr2004Sessions: 230, hexSCpu: 38, hexSThroughput: 58, hexSSessions: 67, unifiU6Cpu: 34, unifiU6Throughput: 80, unifiU6Sessions: 94, omadaCpu: 25, omadaThroughput: 35, omadaSessions: 48 },
  { timestamp: '15:00', hourNum: 15, ccr2004Cpu: 33, ccr2004Throughput: 204, ccr2004Sessions: 242, hexSCpu: 40, hexSThroughput: 61, hexSSessions: 70, unifiU6Cpu: 36, unifiU6Throughput: 84, unifiU6Sessions: 99, omadaCpu: 27, omadaThroughput: 37, omadaSessions: 50 },
  { timestamp: '16:00', hourNum: 16, ccr2004Cpu: 40, ccr2004Throughput: 240, ccr2004Sessions: 278, hexSCpu: 48, hexSThroughput: 73, hexSSessions: 82, unifiU6Cpu: 44, unifiU6Throughput: 99, unifiU6Sessions: 115, omadaCpu: 34, omadaThroughput: 44, omadaSessions: 58 },
  { timestamp: '17:00', hourNum: 17, ccr2004Cpu: 48, ccr2004Throughput: 285, ccr2004Sessions: 310, hexSCpu: 56, hexSThroughput: 86, hexSSessions: 92, unifiU6Cpu: 52, unifiU6Throughput: 118, unifiU6Sessions: 130, omadaCpu: 40, omadaThroughput: 52, omadaSessions: 66 },
  { timestamp: '18:00', hourNum: 18, ccr2004Cpu: 55, ccr2004Throughput: 330, ccr2004Sessions: 355, hexSCpu: 64, hexSThroughput: 100, hexSSessions: 105, unifiU6Cpu: 60, unifiU6Throughput: 136, unifiU6Sessions: 148, omadaCpu: 46, omadaThroughput: 61, omadaSessions: 76 },
  { timestamp: '19:00', hourNum: 19, ccr2004Cpu: 62, ccr2004Throughput: 368, ccr2004Sessions: 388, hexSCpu: 71, hexSThroughput: 112, hexSSessions: 116, unifiU6Cpu: 68, unifiU6Throughput: 152, unifiU6Sessions: 162, omadaCpu: 52, omadaThroughput: 68, omadaSessions: 84 },
  { timestamp: '20:00', hourNum: 20, ccr2004Cpu: 68, ccr2004Throughput: 395, ccr2004Sessions: 412, hexSCpu: 76, hexSThroughput: 120, hexSSessions: 124, unifiU6Cpu: 74, unifiU6Throughput: 164, unifiU6Sessions: 172, omadaCpu: 58, omadaThroughput: 74, omadaSessions: 90 }
]

export function WifiD3Analytics() {
  // State
  const [revenueRangeDays, setRevenueRangeDays] = useState<7 | 14 | 30>(14)
  const [telemetryMetric, setTelemetryMetric] = useState<'cpu' | 'throughput' | 'sessions'>('cpu')
  const [activeRoutersFilter, setActiveRoutersFilter] = useState<{ [key: string]: boolean }>({
    ccr2004: true,
    unifiU6: true,
    hexS: true,
    omada: true
  })
  const [lastRefreshed, setLastRefreshed] = useState<string>('')

  // Refs for SVGs
  const revenueSvgRef = useRef<SVGSVGElement | null>(null)
  const peakHoursSvgRef = useRef<SVGSVGElement | null>(null)
  const telemetrySvgRef = useRef<SVGSVGElement | null>(null)

  // Unique component ID for gradients
  const uniqueId = useId().replace(/:/g, '')

  // Tooltip overlays state
  const [revenueTooltip, setRevenueTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    data?: DailyRevenuePoint
  }>({ visible: false, x: 0, y: 0 })

  const [hourlyTooltip, setHourlyTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    data?: HourlyTrafficPoint
  }>({ visible: false, x: 0, y: 0 })

  const [telemetryTooltip, setTelemetryTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    point?: RouterTelemetryPoint
  }>({ visible: false, x: 0, y: 0 })

  // Initialize timestamp
  useEffect(() => {
    setLastRefreshed(new Date().toLocaleTimeString('sw-TZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
  }, [])

  // =========================================================================
  // CHART 1: D3 DAILY REVENUE TRENDS (AREA + LINE + GLOW DOTS)
  // =========================================================================
  useEffect(() => {
    if (!revenueSvgRef.current) return
    const svgEl = revenueSvgRef.current
    const data = generateRevenueData(revenueRangeDays)

    const width = svgEl.clientWidth || 700
    const height = 260
    const margin = { top: 24, right: 30, bottom: 38, left: 65 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3.select(svgEl)
    svg.selectAll('*').remove()

    svg.attr('viewBox', `0 0 ${width} ${height}`)

    // Create defs for linear gradient
    const defs = svg.append('defs')
    const gradientId = `rev-gradient-${uniqueId}`
    const areaGradient = defs
      .append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')

    areaGradient.append('stop').attr('offset', '0%').attr('stop-color', '#f26522').attr('stop-opacity', 0.45)
    areaGradient.append('stop').attr('offset', '80%').attr('stop-color', '#f26522').attr('stop-opacity', 0.05)
    areaGradient.append('stop').attr('offset', '100%').attr('stop-color', '#f26522').attr('stop-opacity', 0.0)

    // Glowing drop shadow filter
    const filter = defs.append('filter').attr('id', `glow-${uniqueId}`).attr('x', '-20%').attr('y', '-20%').attr('width', '140%').attr('height', '140%')
    filter.append('feGaussianBlur').attr('stdDeviation', 3.5).attr('result', 'coloredBlur')
    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3
      .scalePoint<string>()
      .domain(data.map((d) => d.displayDate))
      .range([0, innerWidth])
      .padding(0.1)

    const maxRev = (d3.max(data, (d) => d.revenueTzs) || 300000) * 1.15
    const yScale = d3.scaleLinear().domain([0, maxRev]).range([innerHeight, 0]).nice()

    // Horizontal Grid Lines
    const yTicks = yScale.ticks(5)
    g.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(yTicks)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'rgba(255, 255, 255, 0.07)')
      .attr('stroke-dasharray', '3 3')

    // X Axis
    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(
        xScale.domain().filter((_, i) => {
          if (revenueRangeDays === 30) return i % 4 === 0
          if (revenueRangeDays === 14) return i % 2 === 0
          return true
        })
      )
      .tickSize(0)
      .tickPadding(12)

    const xAxisGroup = g
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)

    xAxisGroup.select('.domain').attr('stroke', 'rgba(255, 255, 255, 0.15)')
    xAxisGroup
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '11px')
      .attr('font-family', 'ui-monospace, monospace')

    // Y Axis (TZS formatting)
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(0)
      .tickPadding(10)
      .tickFormat((d) => {
        const val = Number(d)
        if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
        if (val >= 1000) return `${(val / 1000).toFixed(0)}k`
        return `${val}`
      })

    const yAxisGroup = g.append('g').call(yAxis)
    yAxisGroup.select('.domain').remove()
    yAxisGroup
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '11px')
      .attr('font-family', 'ui-monospace, monospace')

    // Area Generator
    const areaGen = d3
      .area<DailyRevenuePoint>()
      .x((d) => xScale(d.displayDate) || 0)
      .y0(innerHeight)
      .y1((d) => yScale(d.revenueTzs))
      .curve(d3.curveMonotoneX)

    // Line Generator
    const lineGen = d3
      .line<DailyRevenuePoint>()
      .x((d) => xScale(d.displayDate) || 0)
      .y((d) => yScale(d.revenueTzs))
      .curve(d3.curveMonotoneX)

    // Render Area
    g.append('path')
      .datum(data)
      .attr('fill', `url(#${gradientId})`)
      .attr('d', areaGen)

    // Render Line with glow
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#f26522')
      .attr('stroke-width', 2.5)
      .attr('filter', `url(#glow-${uniqueId})`)
      .attr('d', lineGen)

    // Highlight Peak Day
    const peakItem = data.reduce((prev, curr) => (curr.revenueTzs > prev.revenueTzs ? curr : prev), data[0])
    const peakX = xScale(peakItem.displayDate) || 0
    const peakY = yScale(peakItem.revenueTzs)

    g.append('circle')
      .attr('cx', peakX)
      .attr('cy', peakY)
      .attr('r', 6)
      .attr('fill', '#f26522')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)

    g.append('text')
      .attr('x', peakX)
      .attr('y', peakY - 12)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f97316')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text(`PEAK: TZS ${(peakItem.revenueTzs / 1000).toFixed(0)}k`)

    // Interactive Hover Overlay
    const focusLine = g
      .append('line')
      .attr('stroke', 'rgba(255, 255, 255, 0.4)')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4 4')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .style('opacity', 0)

    const focusCircle = g
      .append('circle')
      .attr('r', 5)
      .attr('fill', '#ffffff')
      .attr('stroke', '#f26522')
      .attr('stroke-width', 2.5)
      .style('opacity', 0)

    // Transparent overlay for mouse tracking
    svg
      .append('rect')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair')
      .on('mousemove', (event) => {
        const [mx] = d3.pointer(event)
        // Find closest point
        const domain = xScale.domain()
        let closestIndex = 0
        let minDiff = Infinity
        domain.forEach((d, idx) => {
          const posX = xScale(d) || 0
          const diff = Math.abs(mx - posX)
          if (diff < minDiff) {
            minDiff = diff
            closestIndex = idx
          }
        })

        const item = data[closestIndex]
        if (!item) return
        const xPos = xScale(item.displayDate) || 0
        const yPos = yScale(item.revenueTzs)

        focusLine.attr('x1', xPos).attr('x2', xPos).style('opacity', 1)
        focusCircle.attr('cx', xPos).attr('cy', yPos).style('opacity', 1)

        const rect = svgEl.getBoundingClientRect()
        setRevenueTooltip({
          visible: true,
          x: rect.left + margin.left + xPos,
          y: rect.top + margin.top + yPos,
          data: item
        })
      })
      .on('mouseleave', () => {
        focusLine.style('opacity', 0)
        focusCircle.style('opacity', 0)
        setRevenueTooltip({ visible: false, x: 0, y: 0 })
      })
  }, [revenueRangeDays, uniqueId])

  // =========================================================================
  // CHART 2: D3 PEAK CONNECTION HOURS (24H DYNAMIC BAR CHART)
  // =========================================================================
  useEffect(() => {
    if (!peakHoursSvgRef.current) return
    const svgEl = peakHoursSvgRef.current
    const data = HOURLY_TRAFFIC_DATA

    const width = svgEl.clientWidth || 550
    const height = 240
    const margin = { top: 24, right: 20, bottom: 36, left: 45 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3.select(svgEl)
    svg.selectAll('*').remove()
    svg.attr('viewBox', `0 0 ${width} ${height}`)

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3
      .scaleBand<string>()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.25)

    const maxClients = (d3.max(data, (d) => d.activeClients) || 450) * 1.1
    const yScale = d3.scaleLinear().domain([0, maxClients]).range([innerHeight, 0]).nice()

    // Average Line Calculation
    const avgClients = d3.mean(data, (d) => d.activeClients) || 160
    const avgY = yScale(avgClients)

    // Horizontal Grid Lines
    const yTicks = yScale.ticks(4)
    g.append('g')
      .selectAll('line')
      .data(yTicks)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'rgba(255, 255, 255, 0.06)')
      .attr('stroke-dasharray', '2 2')

    // Average Threshold Line
    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', avgY)
      .attr('y2', avgY)
      .attr('stroke', '#06b6d4')
      .attr('stroke-width', 1.2)
      .attr('stroke-dasharray', '4 4')

    g.append('text')
      .attr('x', innerWidth - 6)
      .attr('y', avgY - 6)
      .attr('text-anchor', 'end')
      .attr('fill', '#06b6d4')
      .attr('font-size', '9px')
      .attr('font-family', 'ui-monospace, monospace')
      .text(`Wastani: ${Math.round(avgClients)} Vifaa`)

    // Color gradient based on traffic level
    const getColor = (status: HourlyTrafficPoint['status'], count: number) => {
      if (count > 350) return '#f43f5e' // Rose peak rush
      if (status === 'peak') return '#f26522' // Altavox Orange
      if (status === 'busy') return '#f59e0b' // Amber
      if (status === 'normal') return '#10b981' // Emerald
      return '#3b82f6' // Slate blue
    }

    // Render Bars with rounded corners
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.label) || 0)
      .attr('y', (d) => yScale(d.activeClients))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(d.activeClients))
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('fill', (d) => getColor(d.status, d.activeClients))
      .attr('opacity', 0.88)
      .style('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        d3.select(this).attr('opacity', 1).attr('stroke', '#ffffff').attr('stroke-width', 1.5)
        const rect = svgEl.getBoundingClientRect()
        const barX = xScale(d.label) || 0
        const barY = yScale(d.activeClients)
        setHourlyTooltip({
          visible: true,
          x: rect.left + margin.left + barX + xScale.bandwidth() / 2,
          y: rect.top + margin.top + barY,
          data: d
        })
      })
      .on('mouseleave', function () {
        d3.select(this).attr('opacity', 0.88).attr('stroke', 'none')
        setHourlyTooltip({ visible: false, x: 0, y: 0 })
      })

    // X Axis (Show every 3 hours)
    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(
        xScale.domain().filter((label) => {
          const hour = parseInt(label.split(':')[0], 10)
          return hour % 3 === 0
        })
      )
      .tickSize(0)
      .tickPadding(10)

    const xAxisGroup = g.append('g').attr('transform', `translate(0,${innerHeight})`).call(xAxis)
    xAxisGroup.select('.domain').attr('stroke', 'rgba(255, 255, 255, 0.15)')
    xAxisGroup
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('font-family', 'ui-monospace, monospace')

    // Y Axis
    const yAxis = d3.axisLeft(yScale).ticks(4).tickSize(0).tickPadding(8)
    const yAxisGroup = g.append('g').call(yAxis)
    yAxisGroup.select('.domain').remove()
    yAxisGroup
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('font-family', 'ui-monospace, monospace')
  }, [])

  // =========================================================================
  // CHART 3: D3 ROUTER FLEET TELEMETRY OVER TIME (MULTI-LINE)
  // =========================================================================
  useEffect(() => {
    if (!telemetrySvgRef.current) return
    const svgEl = telemetrySvgRef.current
    const data = ROUTER_TELEMETRY_SERIES

    const width = svgEl.clientWidth || 550
    const height = 240
    const margin = { top: 24, right: 30, bottom: 36, left: 45 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3.select(svgEl)
    svg.selectAll('*').remove()
    svg.attr('viewBox', `0 0 ${width} ${height}`)

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3
      .scalePoint<string>()
      .domain(data.map((d) => d.timestamp))
      .range([0, innerWidth])
      .padding(0.1)

    // Compute max for selected metric
    let maxMetricVal = 100
    if (telemetryMetric === 'cpu') {
      maxMetricVal = 100
    } else if (telemetryMetric === 'throughput') {
      maxMetricVal = 420 // Mbps
    } else {
      maxMetricVal = 440 // Sessions
    }

    const yScale = d3.scaleLinear().domain([0, maxMetricVal]).range([innerHeight, 0]).nice()

    // Grid Lines
    const yTicks = yScale.ticks(4)
    g.append('g')
      .selectAll('line')
      .data(yTicks)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'rgba(255, 255, 255, 0.06)')
      .attr('stroke-dasharray', '2 2')

    // Router series configurations
    const seriesConfig = [
      {
        id: 'ccr2004',
        name: 'CCR2004 Core (Kariakoo)',
        color: '#f26522', // Altavox Orange
        getValue: (d: RouterTelemetryPoint) =>
          telemetryMetric === 'cpu'
            ? d.ccr2004Cpu
            : telemetryMetric === 'throughput'
            ? d.ccr2004Throughput
            : d.ccr2004Sessions
      },
      {
        id: 'unifiU6',
        name: 'UniFi U6 LR (Hosteli)',
        color: '#06b6d4', // Cyan
        getValue: (d: RouterTelemetryPoint) =>
          telemetryMetric === 'cpu'
            ? d.unifiU6Cpu
            : telemetryMetric === 'throughput'
            ? d.unifiU6Throughput
            : d.unifiU6Sessions
      },
      {
        id: 'hexS',
        name: 'hEX S (Ghorofa 1)',
        color: '#10b981', // Emerald
        getValue: (d: RouterTelemetryPoint) =>
          telemetryMetric === 'cpu'
            ? d.hexSCpu
            : telemetryMetric === 'throughput'
            ? d.hexSThroughput
            : d.hexSSessions
      },
      {
        id: 'omada',
        name: 'Omada ER605 (Mgahawa)',
        color: '#a855f7', // Purple
        getValue: (d: RouterTelemetryPoint) =>
          telemetryMetric === 'cpu'
            ? d.omadaCpu
            : telemetryMetric === 'throughput'
            ? d.omadaThroughput
            : d.omadaSessions
      }
    ]

    // Draw active series
    seriesConfig.forEach((series) => {
      if (!activeRoutersFilter[series.id]) return

      const lineGen = d3
        .line<RouterTelemetryPoint>()
        .x((d) => xScale(d.timestamp) || 0)
        .y((d) => yScale(series.getValue(d)))
        .curve(d3.curveMonotoneX)

      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', series.color)
        .attr('stroke-width', 2)
        .attr('d', lineGen)

      // Circles for data points
      g.selectAll(`.dot-${series.id}`)
        .data(data)
        .enter()
        .append('circle')
        .attr('class', `dot-${series.id}`)
        .attr('cx', (d) => xScale(d.timestamp) || 0)
        .attr('cy', (d) => yScale(series.getValue(d)))
        .attr('r', 3)
        .attr('fill', series.color)
        .attr('stroke', '#072444')
        .attr('stroke-width', 1.5)
    })

    // X Axis
    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(
        xScale.domain().filter((_, i) => i % 2 === 0)
      )
      .tickSize(0)
      .tickPadding(10)

    const xAxisGroup = g.append('g').attr('transform', `translate(0,${innerHeight})`).call(xAxis)
    xAxisGroup.select('.domain').attr('stroke', 'rgba(255, 255, 255, 0.15)')
    xAxisGroup
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('font-family', 'ui-monospace, monospace')

    // Y Axis
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(4)
      .tickSize(0)
      .tickPadding(8)
      .tickFormat((d) => {
        const val = Number(d)
        if (telemetryMetric === 'cpu') return `${val}%`
        if (telemetryMetric === 'throughput') return `${val}M`
        return `${val}`
      })

    const yAxisGroup = g.append('g').call(yAxis)
    yAxisGroup.select('.domain').remove()
    yAxisGroup
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('font-family', 'ui-monospace, monospace')

    // Interactive Hover Tracking
    const focusLine = g
      .append('line')
      .attr('stroke', 'rgba(255, 255, 255, 0.3)')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '3 3')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .style('opacity', 0)

    svg
      .append('rect')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair')
      .on('mousemove', (event) => {
        const [mx] = d3.pointer(event)
        const domain = xScale.domain()
        let closestIndex = 0
        let minDiff = Infinity
        domain.forEach((d, idx) => {
          const posX = xScale(d) || 0
          const diff = Math.abs(mx - posX)
          if (diff < minDiff) {
            minDiff = diff
            closestIndex = idx
          }
        })

        const item = data[closestIndex]
        if (!item) return
        const xPos = xScale(item.timestamp) || 0

        focusLine.attr('x1', xPos).attr('x2', xPos).style('opacity', 1)

        const rect = svgEl.getBoundingClientRect()
        setTelemetryTooltip({
          visible: true,
          x: rect.left + margin.left + xPos,
          y: rect.top + margin.top + innerHeight / 2,
          point: item
        })
      })
      .on('mouseleave', () => {
        focusLine.style('opacity', 0)
        setTelemetryTooltip({ visible: false, x: 0, y: 0 })
      })
  }, [telemetryMetric, activeRoutersFilter])

  // Calculation summaries
  const revenuePoints = generateRevenueData(revenueRangeDays)
  const totalRevenue = revenuePoints.reduce((acc, curr) => acc + curr.revenueTzs, 0)
  const totalTransactions = revenuePoints.reduce((acc, curr) => acc + curr.transactions, 0)
  const avgDailyRevenue = Math.round(totalRevenue / revenuePoints.length)

  return (
    <div className="space-y-6">
      {/* ================================================================= */}
      {/* SECTION HEADER: D3.JS TELEMETRY ENGINE */}
      {/* ================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#072444] p-5 shadow-xl">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f26522] to-amber-600 text-white shadow-lg shadow-orange-500/20 shrink-0">
            <BarChart3 className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                D3.js Live Hotspot Analytics & Telemetry Engine
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live D3 SVG
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Uchambuzi wa moja kwa moja wa mapato, masaa ya msongamano na afya ya vifaa vya mtandao (MikroTik, UniFi, Omada).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-mono">
          <span className="text-slate-400 text-[11px]">Sasisho la Mwisho:</span>
          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-white font-bold">
            {lastRefreshed || '18:04:12'}
          </span>
          <button
            onClick={() => {
              setLastRefreshed(new Date().toLocaleTimeString('sw-TZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
              // Force trigger state
              setRevenueRangeDays((prev) => prev)
            }}
            title="Sasisha Takwimu"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <RefreshCw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* CHART 1: DAILY REVENUE TRENDS (D3 AREA / LINE) */}
      {/* ================================================================= */}
      <div className="rounded-2xl border border-white/10 bg-[#072444] p-5 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Glow accent in corner */}
        <div className="absolute -top-24 -right-24 size-64 rounded-full bg-[#f26522]/10 blur-3xl pointer-events-none" />

        {/* Top bar controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-[#f26522]/20 text-[#f26522]">
                <TrendingUp className="size-4" />
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Mwenendo wa Mapato ya Kila Siku (Daily Revenue Trends)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Jumla ya mapato ya TZS yaliyokusanywa moja kwa moja kwenye M-Pesa, Tigo Pesa, na vocha za karatasi.
            </p>
          </div>

          {/* Timeframe Selectors */}
          <div className="flex items-center gap-1.5 bg-[#041221] border border-white/10 p-1 rounded-xl self-start md:self-auto">
            <span className="text-[11px] font-mono text-slate-400 px-2 hidden sm:inline">Kipindi:</span>
            {([7, 14, 30] as const).map((days) => (
              <button
                key={days}
                onClick={() => setRevenueRangeDays(days)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  revenueRangeDays === days
                    ? 'bg-[#f26522] text-white shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {days} Siku
              </button>
            ))}
          </div>
        </div>

        {/* Mini KPI Tickers for Revenue */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Jumla ya Kipindi</span>
            <span className="text-base sm:text-lg font-black text-white font-mono">
              TZS {totalRevenue.toLocaleString()}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Wastani kwa Siku</span>
            <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
              TZS {avgDailyRevenue.toLocaleString()}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Miamala Iliyokamilika</span>
            <span className="text-base sm:text-lg font-black text-white font-mono">
              {totalTransactions.toLocaleString()}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Ufanisi wa Mtandao</span>
            <span className="text-base sm:text-lg font-black text-[#f26522] font-mono flex items-center gap-1">
              99.94% <ArrowUpRight className="size-3.5 text-emerald-400" />
            </span>
          </div>
        </div>

        {/* Responsive D3 SVG Container */}
        <div className="relative w-full overflow-hidden">
          <svg
            ref={revenueSvgRef}
            className="w-full h-[260px] overflow-visible"
            aria-label="D3 Daily Revenue Trends"
          />
        </div>

        {/* Floating Tooltip for Revenue */}
        {revenueTooltip.visible && revenueTooltip.data && (
          <div
            className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3 bg-[#041221] border border-orange-500/40 rounded-xl p-3 shadow-2xl text-xs space-y-1.5 backdrop-blur-md min-w-[190px]"
            style={{ left: `${revenueTooltip.x}px`, top: `${revenueTooltip.y - 12}px` }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-1 text-slate-300 font-mono text-[11px]">
              <span className="font-bold text-white">{revenueTooltip.data.displayDate}</span>
              <span className="text-[#f26522] font-semibold">{revenueTooltip.data.transactions} Miamala</span>
            </div>
            <div className="text-sm font-black text-white font-mono">
              TZS {revenueTooltip.data.revenueTzs.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 space-y-0.5 pt-0.5">
              <div className="flex justify-between">
                <span>Lipa Namba Till (74%):</span>
                <span className="text-emerald-400 font-mono font-semibold">
                  TZS {revenueTooltip.data.mobileMoneySales.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Vocha za Mawakala (26%):</span>
                <span className="text-amber-400 font-mono font-semibold">
                  TZS {revenueTooltip.data.voucherSales.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* LOWER 2-COLUMN GRID: PEAK HOURS & ROUTER TELEMETRY */}
      {/* ================================================================= */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* =============================================================== */}
        {/* CHART 2: PEAK CONNECTION HOURS (D3 24H BAR CHART) */}
        {/* =============================================================== */}
        <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#072444] p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Clock className="size-4" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    Masaa ya Msongamano wa Wateja (24H)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Mchanganuo wa saa 00:00 hadi 23:00 unaonyesha vipindi vya juu zaidi.
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded">
                Peak: 18:00 - 22:00
              </span>
            </div>

            {/* Quick Status Legend */}
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 mb-3">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded bg-rose-500" /> &gt;350 Vifaa (Rush)
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded bg-[#f26522]" /> Peak (250-350)
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded bg-amber-500" /> Kawaida (150-250)
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded bg-blue-500" /> Chini (&lt;100)
              </span>
            </div>

            {/* D3 Bar Chart Container */}
            <div className="relative w-full overflow-hidden">
              <svg
                ref={peakHoursSvgRef}
                className="w-full h-[240px] overflow-visible"
                aria-label="D3 Peak Connection Hours"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Saa ya Dhahabu: <strong className="text-white">20:00 (Wateja 412)</strong></span>
            <span className="text-emerald-400 font-semibold">Upana wa Bendi: 395 Mbps</span>
          </div>

          {/* Hover Tooltip for Hourly Traffic */}
          {hourlyTooltip.visible && hourlyTooltip.data && (
            <div
              className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3 bg-[#041221] border border-cyan-500/40 rounded-xl p-2.5 shadow-2xl text-xs space-y-1 backdrop-blur-md min-w-[170px]"
              style={{ left: `${hourlyTooltip.x}px`, top: `${hourlyTooltip.y - 10}px` }}
            >
              <div className="flex items-center justify-between font-mono text-slate-300 font-bold border-b border-white/10 pb-1">
                <span>Saa {hourlyTooltip.data.label}</span>
                <span className="text-cyan-400">{hourlyTooltip.data.status.toUpperCase()}</span>
              </div>
              <div className="text-white font-extrabold text-sm font-mono">
                {hourlyTooltip.data.activeClients} Vifaa Mkondoni
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Traffic Flow: <strong className="text-white">{hourlyTooltip.data.bandwidthMbps} Mbps</strong>
              </div>
            </div>
          )}
        </div>

        {/* =============================================================== */}
        {/* CHART 3: ROUTER PERFORMANCE & TELEMETRY (D3 MULTI-LINE) */}
        {/* =============================================================== */}
        <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#072444] p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Activity className="size-4" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    Utendaji wa Vipanga Njia (Fleet Telemetry)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Ufuatiliaji wa wakati halisi wa CPU na Bandwidth kwa kila kifaa.
                  </p>
                </div>
              </div>

              {/* Metric Selector Toggles */}
              <div className="flex items-center gap-1 bg-[#041221] border border-white/10 p-1 rounded-xl self-start sm:self-auto">
                <button
                  onClick={() => setTelemetryMetric('cpu')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition cursor-pointer ${
                    telemetryMetric === 'cpu'
                      ? 'bg-emerald-500 text-slate-900 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CPU %
                </button>
                <button
                  onClick={() => setTelemetryMetric('throughput')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition cursor-pointer ${
                    telemetryMetric === 'throughput'
                      ? 'bg-cyan-500 text-slate-900 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mbps
                </button>
                <button
                  onClick={() => setTelemetryMetric('sessions')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition cursor-pointer ${
                    telemetryMetric === 'sessions'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sessions
                </button>
              </div>
            </div>

            {/* Interactive Router Filter Toggles */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {[
                { id: 'ccr2004', name: 'CCR2004 Core', color: '#f26522', bg: 'bg-[#f26522]' },
                { id: 'unifiU6', name: 'UniFi U6 LR', color: '#06b6d4', bg: 'bg-cyan-400' },
                { id: 'hexS', name: 'hEX S', color: '#10b981', bg: 'bg-emerald-400' },
                { id: 'omada', name: 'Omada ER605', color: '#a855f7', bg: 'bg-purple-400' }
              ].map((r) => {
                const isActive = activeRoutersFilter[r.id]
                return (
                  <button
                    key={r.id}
                    onClick={() =>
                      setActiveRoutersFilter((prev) => ({
                        ...prev,
                        [r.id]: !prev[r.id]
                      }))
                    }
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono border transition cursor-pointer ${
                      isActive
                        ? 'border-white/20 bg-white/10 text-white font-bold'
                        : 'border-white/5 bg-transparent text-slate-500 line-through opacity-60'
                    }`}
                  >
                    <span className={`size-2 rounded-full ${r.bg}`} />
                    <span>{r.name}</span>
                  </button>
                )
              })}
            </div>

            {/* D3 Multi-Line Chart Container */}
            <div className="relative w-full overflow-hidden">
              <svg
                ref={telemetrySvgRef}
                className="w-full h-[240px] overflow-visible"
                aria-label="D3 Router Telemetry Multi-Line"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="size-3.5" />
              <span>RADIUS REST API Synced</span>
            </span>
            <span>CCR2004 CPU Peak: <strong className="text-white">68%</strong> (Salama)</span>
          </div>

          {/* Hover Tooltip for Telemetry */}
          {telemetryTooltip.visible && telemetryTooltip.point && (
            <div
              className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3 bg-[#041221] border border-emerald-500/40 rounded-xl p-3 shadow-2xl text-xs space-y-1.5 backdrop-blur-md min-w-[210px]"
              style={{ left: `${telemetryTooltip.x}px`, top: `${telemetryTooltip.y - 12}px` }}
            >
              <div className="flex items-center justify-between font-mono text-slate-300 font-bold border-b border-white/10 pb-1">
                <span>Muda: {telemetryTooltip.point.timestamp}</span>
                <span className="text-emerald-400 uppercase font-mono">{telemetryMetric}</span>
              </div>
              <div className="space-y-1 font-mono text-[11px]">
                {activeRoutersFilter.ccr2004 && (
                  <div className="flex justify-between items-center text-[#f26522]">
                    <span>CCR2004 Core:</span>
                    <strong className="font-bold text-white">
                      {telemetryMetric === 'cpu'
                        ? `${telemetryTooltip.point.ccr2004Cpu}%`
                        : telemetryMetric === 'throughput'
                        ? `${telemetryTooltip.point.ccr2004Throughput} Mbps`
                        : `${telemetryTooltip.point.ccr2004Sessions} Clients`}
                    </strong>
                  </div>
                )}
                {activeRoutersFilter.unifiU6 && (
                  <div className="flex justify-between items-center text-cyan-400">
                    <span>UniFi U6 LR:</span>
                    <strong className="font-bold text-white">
                      {telemetryMetric === 'cpu'
                        ? `${telemetryTooltip.point.unifiU6Cpu}%`
                        : telemetryMetric === 'throughput'
                        ? `${telemetryTooltip.point.unifiU6Throughput} Mbps`
                        : `${telemetryTooltip.point.unifiU6Sessions} Clients`}
                    </strong>
                  </div>
                )}
                {activeRoutersFilter.hexS && (
                  <div className="flex justify-between items-center text-emerald-400">
                    <span>hEX S:</span>
                    <strong className="font-bold text-white">
                      {telemetryMetric === 'cpu'
                        ? `${telemetryTooltip.point.hexSCpu}%`
                        : telemetryMetric === 'throughput'
                        ? `${telemetryTooltip.point.hexSThroughput} Mbps`
                        : `${telemetryTooltip.point.hexSSessions} Clients`}
                    </strong>
                  </div>
                )}
                {activeRoutersFilter.omada && (
                  <div className="flex justify-between items-center text-purple-400">
                    <span>Omada ER605:</span>
                    <strong className="font-bold text-white">
                      {telemetryMetric === 'cpu'
                        ? `${telemetryTooltip.point.omadaCpu}%`
                        : telemetryMetric === 'throughput'
                        ? `${telemetryTooltip.point.omadaThroughput} Mbps`
                        : `${telemetryTooltip.point.omadaSessions} Clients`}
                    </strong>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
