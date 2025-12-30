import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHomePage() {
  return (
    <div>
      <Link to="/admin/tables">Manage Tables</Link>
      <Link to = "/admin/reservation-list">Manage REservations</Link>
    </div>
  )
}
