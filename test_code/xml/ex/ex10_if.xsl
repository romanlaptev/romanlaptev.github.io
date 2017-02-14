<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
  <body>
    <h2>My CD Collection</h2>
    <table border="1">
      <tr bgcolor="#9acd32">
      <th>Title</th>
      <th>Artist</th>
      <th>country</th>
      <th>company</th>
      <th>price</th>
      <th>year</th>
    </tr>
    <xsl:for-each select="catalog/cd">
    <xsl:if test="price>10">
      <tr>
        <td><xsl:value-of select="title"/></td>
        <td><xsl:value-of select="artist"/></td>
        <td><xsl:value-of select="country"/></td>
        <td><xsl:value-of select="company"/></td>
        <td><xsl:value-of select="price"/></td>
        <td><xsl:value-of select="year"/></td>

	    </tr>
    </xsl:if>
    </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>

