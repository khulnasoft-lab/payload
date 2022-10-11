import { CollectionConfig } from 'payload/types';

const Customers: CollectionConfig = {
  slug: 'customers',
  timestamps: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: [
      'email',
      'name',
    ]
  },
  auth: {
    useAPIKey: true,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'subscriptions',
      label: 'Subscriptions',
      type: 'array',
      admin: {
        description: 'All subscriptions are managed in Stripe and will be reflected here. Use the link in the sidebar to go directly to this customer in Stripe to begin managing their subscriptions.',
      },
      fields: [
        {
          name: 'stripeSubscriptionID',
          label: 'Stripe ID',
          type: 'text',
          admin: {
            readOnly: true
          }
        },
        {
          name: 'stripeProductID',
          label: 'Product ID',
          type: 'text',
          admin: {
            readOnly: true
          }
        },
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          admin: {
            readOnly: true
          }
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          admin: {
            readOnly: true
          },
          options: [
            {
              label: 'Active',
              value: 'active'

            },
            {
              label: 'Canceled',
              value: 'canceled'
            },
            {
              label: 'Incomplete',
              value: 'incomplete'
            },
            {
              label: 'Incomplete Expired',
              value: 'incomplete_expired'
            },
            {
              label: 'Past Due',
              value: 'past_due'
            },
            {
              label: 'Trialing',
              value: 'trialing'
            },
            {
              label: 'Unpaid',
              value: 'unpaid'
            }
          ],
        }
      ]
    },
  ]
}

export default Customers;