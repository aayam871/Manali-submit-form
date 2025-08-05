'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface ResponseEntry {
  id: number
  name: string
  option: string | null
  reason: string
  created_at: string
}

export default function ResponsesPage() {
  const [responses, setResponses] = useState<ResponseEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const { data, error } = await supabase
          .from('manali_responses')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching responses:', error)
        } else {
          setResponses(data || [])
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResponses()
  }, [])

  return (
    <main className="min-h-screen px-4 py-10 bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
          Manali Trip 2082 - All Responses
        </h1>

        {loading ? (
          <p className="text-center text-lg">Loading responses...</p>
        ) : responses.length === 0 ? (
          <p className="text-center text-lg">No responses yet.</p>
        ) : (
          <div className="space-y-4">
            {responses.map((response) => (
              <div key={response.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-700">{response.name}</h3>
                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Option:</span> {response.option || 'No option selected'}
                </p>
                <p className="text-gray-700 mt-1">
                  <span className="font-medium">Reason:</span> {response.reason}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Submitted: {new Date(response.created_at).toLocaleString('ne-NP')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
