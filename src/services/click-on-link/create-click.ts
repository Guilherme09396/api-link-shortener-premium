import { Clicks } from 'generated/prisma'
import axios from 'axios'
import { ClickRepository } from '@/repositories/click-repository'

type location = {
  query: string
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
}

interface CreateClickRequest {
  ip?: string
  userAgent?: string
  dateOfAccess?: string
  lon?: number
  lat?: number
  location?: string
  linkId: string
}

interface CreateClickResponse {
  click: Clicks
}

export class CreateClick {
  constructor(private clickRepository: ClickRepository) {}

  async execute({
    ip,
    dateOfAccess,
    lon,
    lat,
    location,
    userAgent,
    linkId,
  }: CreateClickRequest): Promise<CreateClickResponse> {
    if (ip) {
      const response = await axios.get(`http://ip-api.com/json/${ip}`)
      const data: location = response.data
      if (!data.status) {
        lon = data.lon
        lat = data.lat
        location = `${data.regionName}/${data.region} - ${data.country}`
      }
    }

    const click = await this.clickRepository.create({
      ip,
      user_agent: userAgent,
      lat,
      lon,
      location,
      date_of_access: dateOfAccess,
      link_id: linkId,
    })

    return { click }
  }
}
